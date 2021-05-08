/*
 * docker run --name ts-sql-query-mariadb -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mariadb
 * 'test' databade must exists
 */

import { Table } from "../Table"
import { assertEquals } from "./assertEquals"
import { ConsoleLogQueryRunner } from "../queryRunners/ConsoleLogQueryRunner"
import { MariaDBConnection } from "../connections/MariaDBConnection"
import { PrismaClient } from './prisma/generated/mariadb'
import { PrismaQueryRunner } from "../queryRunners/PrismaQueryRunner"

class DBConection extends MariaDBConnection<'DBConnection'> {
    // increment(i: number) {
    //     return this.executeFunction('increment', [this.const(i, 'int')], 'int', 'required')
    // }
    // appendToAllCompaniesName(aditional: string) {
    //     return this.executeProcedure('append_to_all_companies_name', [this.const(aditional, 'string')])
    // }
}

const tCompany = new class TCompany extends Table<DBConection, 'TCompany'> {
    id = this.autogeneratedPrimaryKey('id', 'int');
    name = this.column('name', 'string');
    constructor() {
        super('company'); // table name in the database
    }
}()

const tCustomer = new class TCustomer extends Table<DBConection, 'TCustomer'> {
    id = this.autogeneratedPrimaryKey('id', 'int');
    firstName = this.column('first_name', 'string');
    lastName = this.column('last_name', 'string');
    birthday = this.optionalColumn('birthday', 'localDate');
    companyId = this.column('company_id', 'int');
    constructor() {
        super('customer'); // table name in the database
    }
}()

const prisma = new PrismaClient()

async function main() {
    const connection = new DBConection(new ConsoleLogQueryRunner(new PrismaQueryRunner(prisma)))
    // Long running transactions are not supported by Prisma. See https://github.com/prisma/prisma/issues/1844
    // await connection.beginTransaction()

    // let commit = false
    try {
        await connection.queryRunner.executeDatabaseSchemaModification(`drop table if exists customer`)
        await connection.queryRunner.executeDatabaseSchemaModification(`drop table if exists company`)
        // await connection.queryRunner.executeDatabaseSchemaModification(`drop function if exists increment`)
        // await connection.queryRunner.executeDatabaseSchemaModification(`drop procedure if exists append_to_all_companies_name`)

        await connection.queryRunner.executeDatabaseSchemaModification(`
            create table company (
                id int auto_increment primary key,
                name varchar(100) not null
            )
        `)

        await connection.queryRunner.executeDatabaseSchemaModification(`
            create table customer (
                id int auto_increment primary key,
                first_name varchar(100) not null,
                last_name varchar(100) not null,
                birthday date,
                company_id int not null references company(id)
            )
        `)

        // await connection.queryRunner.executeDatabaseSchemaModification(`
        //     create function incrementt(i int) returns int
        //         begin
        //             return i + 1;
        //         end
        // `)

        // await connection.queryRunner.executeDatabaseSchemaModification(`
        //     create procedure append_to_all_companies_name(aditional varchar(100))
        //         begin
        //             update company set name = concat(name, aditional);
        //         end
        // `)

        let i = await connection
            .insertInto(tCompany)
            .values({ name: 'ACME' })
            .returningLastInsertedId()
            .executeInsert()
        assertEquals(i, 1)

        i = await connection
            .insertInto(tCompany)
            .values({ name: 'FOO' })
            .executeInsert()
        assertEquals(i, 1)

        i = await connection
            .insertInto(tCustomer)
            .values({ firstName: 'John', lastName: 'Smith', companyId: 1 })
            .returningLastInsertedId()
            .executeInsert()
        assertEquals(i, 1)
                
        i = await connection
            .insertInto(tCustomer)
            .values({ firstName: 'Other', lastName: 'Person', companyId: 1 })
            .returningLastInsertedId()
            .executeInsert()
        assertEquals(i, 2)

        i = await connection
            .insertInto(tCustomer)
            .values({ firstName: 'Jane', lastName: 'Doe', companyId: 1 })
            .returningLastInsertedId()
            .executeInsert()
        assertEquals(i, 3)

        let company = await connection
            .selectFrom(tCompany)
            .where(tCompany.id.equals(1))
            .select({
                id: tCompany.id,
                name: tCompany.name
            })
            .executeSelectOne()
        assertEquals(company, { id: 1, name: 'ACME' })

        let companies = await connection
            .selectFrom(tCompany)
            .select({
                id: tCompany.id,
                name: tCompany.name
            })
            .orderBy('id')
            .executeSelectMany()
        assertEquals(companies, [{ id: 1, name: 'ACME' }, { id: 2, name: 'FOO' }])

        let name = await connection
            .selectFrom(tCompany)
            .where(tCompany.id.equals(1))
            .selectOneColumn(tCompany.name)
            .executeSelectOne()
        assertEquals(name, 'ACME')

        let names = await connection
            .selectFrom(tCompany)
            .selectOneColumn(tCompany.name)
            .orderBy('result')
            .executeSelectMany()
        assertEquals(names, ['ACME', 'FOO'])

        i = await connection
            .insertInto(tCompany)
            .from(
                connection
                .selectFrom(tCompany)
                .select({
                    name: tCompany.name.concat(' 2')
                })
            )
            .executeInsert()
        assertEquals(i, 2)

        names = await connection
            .selectFrom(tCompany)
            .selectOneColumn(tCompany.name)
            .orderBy('result')
            .executeSelectMany()
        assertEquals(names, ['ACME', 'ACME 2', 'FOO', 'FOO 2'])

        i = await connection
            .update(tCompany)
            .set({
                name: tCompany.name.concat(tCompany.name)
            })
            .where(tCompany.id.equals(2))
            .executeUpdate()
        assertEquals(i, 1)

        name = await connection
            .selectFrom(tCompany)
            .where(tCompany.id.equals(2))
            .selectOneColumn(tCompany.name)
            .executeSelectOne()
        assertEquals(name, 'FOOFOO')

        i = await connection
            .deleteFrom(tCompany)
            .where(tCompany.id.equals(2))
            .executeDelete()
        assertEquals(i, 1)

        let maybe = await connection
            .selectFrom(tCompany)
            .where(tCompany.id.equals(2))
            .selectOneColumn(tCompany.name)
            .executeSelectNoneOrOne()
        assertEquals(maybe, null)

        let page = await connection
            .selectFrom(tCustomer)
            .select({
                id: tCustomer.id,
                name: tCustomer.firstName.concat(' ').concat(tCustomer.lastName)
            })
            .orderBy('id')
            .limit(2)
            .executeSelectPage()
        assertEquals(page, {
            count: 3,
            data: [
                { id: 1, name: 'John Smith' },
                { id: 2, name: 'Other Person' }
            ]
        })

        const customerCountPerCompanyWith = connection.selectFrom(tCompany)
            .innerJoin(tCustomer).on(tCustomer.companyId.equals(tCompany.id))
            .select({
                companyId: tCompany.id,
                companyName: tCompany.name,
                endsWithME: tCompany.name.endWithInsensitive('me'),
                customerCount: connection.count(tCustomer.id)
            }).groupBy('companyId', 'companyName', 'endsWithME')
            .forUseInQueryAs('customerCountPerCompany')

        const customerCountPerAcmeCompanies = await connection.selectFrom(customerCountPerCompanyWith)
            .where(customerCountPerCompanyWith.companyName.containsInsensitive('ACME'))
            .select({
                acmeCompanyId: customerCountPerCompanyWith.companyId,
                acmeCompanyName: customerCountPerCompanyWith.companyName,
                acmeEndsWithME: customerCountPerCompanyWith.endsWithME,
                acmeCustomerCount: customerCountPerCompanyWith.customerCount
            })
            .executeSelectMany()
        assertEquals(customerCountPerAcmeCompanies, [
            { acmeCompanyId: 1, acmeCompanyName: 'ACME', acmeEndsWithME: true, acmeCustomerCount: 3 }
        ])

        // i = await connection.increment(10)
        // assertEquals(i, 11)

        // await connection.appendToAllCompaniesName(' Cia.')

        // name = await connection
        //     .selectFrom(tCompany)
        //     .where(tCompany.id.equals(1))
        //     .selectOneColumn(tCompany.name)
        //     .executeSelectOne()
        // assertEquals(name, 'ACME Cia.')

        // commit = true
    } finally {
        // Long running transactions are not supported by Prisma. See https://github.com/prisma/prisma/issues/1844
        // if (commit) {
        //     connection.commit()
        // } else {
        //     connection.rollback()
        // }
    }
}

main().finally(async () => {
    await prisma.$disconnect()
}).then(() => {
    console.log('All ok')
    process.exit(0)
}).catch((e) => {
    console.error(e)
    process.exit(1)
})

