/*
 * All symbols defined here are expected to don't have value
 */

// Type marks
export const isValueSourceObject: unique symbol = Symbol('isValueSourceObject')
export const isColumnObject: unique symbol = Symbol('isColumnObject')
export const isSelectQueryObject: unique symbol = Symbol('isSelectQueryObject')

// General Symbols
export const type: unique symbol = Symbol('type')
export const database: unique symbol = Symbol('database')
export const tableOrView: unique symbol = Symbol('tableOrView')
export const tableOrViewRef: unique symbol = Symbol('tableOrViewRef')
export const tableOrViewRefType: unique symbol = Symbol('tableOrViewRef')
export const tableOrViewCustomName: unique symbol = Symbol('tableOrViewCustomName')
export const resultType: unique symbol = Symbol('resultType')
export const columnsType: unique symbol = Symbol('columnsType')
export const compoundableColumns: unique symbol = Symbol('compoundableColumns')
export const rawFragment: unique symbol = Symbol('rawFragment')
export const resolvedShape: unique symbol = Symbol('resolvedShape')

// Expressions
export const requiredTableOrView: unique symbol = Symbol('requiredTableOrView')

// Tables or Views
export const tableName: unique symbol = Symbol('tableName')
export const viewName: unique symbol = Symbol('viewName')
export const tableOrViewAlias: unique symbol = Symbol('tableOrViewAlias')
export const noTableOrViewRequired: unique symbol = Symbol('noTableOrViewRequiredType')
export const outerJoinDatabase: unique symbol = Symbol('outerJoinDatabase')
export const outerJoinTableOrView: unique symbol = Symbol('outerJoinTableOrView')
export const outerJoinAlias: unique symbol = Symbol('outerJoinAlias')
export const oldValues: unique symbol = Symbol('oldValues')
export const valuesForInsert: unique symbol = Symbol('valuesForInsert')

// Columns
export const valueType: unique symbol = Symbol('valueType')
export const optionalType: unique symbol = Symbol('optionalType')
export const hasDefaultValue: unique symbol = Symbol('hasDefaultValue')
export const optionalValue: unique symbol = Symbol('optionalValue')
export const autogeneratedPrimaryKeyValue: unique symbol = Symbol('autogeneratedPrimaryKeyValue')
export const primaryKeyValue: unique symbol = Symbol('primaryKeyValue')
export const computedValue: unique symbol = Symbol('computedValue')

// Connection
export const databaseName: unique symbol = Symbol('databaseName')

// Database type
export const anyDBType: unique symbol = Symbol('anyDBType')
export const typeSafeDBType: unique symbol = Symbol('typeSafeDBType')
export const typeUnsafeDBType: unique symbol = Symbol('typeUnsafeDBType')

export const mariaDBType: unique symbol = Symbol('mariaDBType')
export const mySqlType: unique symbol = Symbol('mySqlType')
export const noopDBType: unique symbol = Symbol('noopDBType')
export const oracleType: unique symbol = Symbol('oracleType')
export const postgreSqlType: unique symbol = Symbol('postgreSqlType')
export const sqliteType: unique symbol = Symbol('sqliteType')
export const sqlServerType: unique symbol = Symbol('sqlServerType')

export const nextMethodNotSupportedByThisConnection: unique symbol = Symbol('nextMethodNotSupportedByThisConnection') 

// Value source type
export const valueSourceType: unique symbol = Symbol('valueSourceType')
export const valueSourceTypeName: unique symbol = Symbol('valueSourceTypeName')
export const nullableValueSourceType: unique symbol = Symbol('nullableValueSourceType')
export const equalableValueSourceType: unique symbol = Symbol('equalableValueSourceType')
export const comparableValueSourceType: unique symbol = Symbol('comparableValueSourceType')
export const booleanValueSourceType: unique symbol = Symbol('booleanValueSourceType')
export const ifValueSourceType: unique symbol = Symbol('ifValueSourceType')
export const anyBooleanValueSourceType: unique symbol = Symbol('anyBooleanValueSourceType')
export const numberValueSourceType: unique symbol = Symbol('numberValueSourceType')
export const stringNumberValueSourceType: unique symbol = Symbol('stringNumberValueSourceType')
export const intValueSourceType: unique symbol = Symbol('intValueSourceType')
export const doubleValueSourceType: unique symbol = Symbol('doubleValueSourceType')
export const bigintValueSourceType: unique symbol = Symbol('bigintValueSourceType')
export const typeSafeBigintValueSourceType: unique symbol = Symbol('typeSafeBigintValueSourceType')
export const stringIntValueSourceType: unique symbol = Symbol('stringIntValueSourceType')
export const stringDoubleValueSourceType: unique symbol = Symbol('stringDoubleValueSourceType')
export const stringValueSourceType: unique symbol = Symbol('stringValueSourceType')
export const typeSafeStringValueSourceType: unique symbol = Symbol('typeSafeStringValueSourceType')
export const uuidValueSourceType: unique symbol = Symbol('uuidValueSourceType')
export const typeSafeUuidValueSourceType: unique symbol = Symbol('typeSafeUuidValueSourceType')
export const dateValueSourceType: unique symbol = Symbol('dateValueSourceType')
export const timeValueSourceType: unique symbol = Symbol('timeValueSourceType')
export const dateTimeValueSourceType: unique symbol = Symbol('dateTimeValueSourceType')
export const localDateValueSourceType: unique symbol = Symbol('localDateValueSourceType')
export const localTimeValueSourceType: unique symbol = Symbol('localTimeValueSourceType')
export const localDateTimeValueSourceType: unique symbol = Symbol('localDateTimeValueSourceType')
export const aggregatedArrayValueSourceType: unique symbol = Symbol('aggregatedArrayValueSourceType')

// Opaque types
export const dontCallConstructor: unique symbol = Symbol('dontCallConstructor')
export const neverUsedSymbol: unique symbol = Symbol('neverUsedSymbol')