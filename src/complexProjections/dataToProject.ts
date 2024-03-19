import type { AnyValueSource, ValueSourceOf } from "../expressions/values"
import type { NSource } from "../utils/sourceName"
import type { source } from "../utils/symbols"

/*
 * This contains the types needed a base for the functions that receves a
 * complex projections, like the argument type in a selec(...)
 */

// [source]?: SOURCE is here to improve TS error messages
export type DataToProject</*in|out*/ SOURCE extends NSource> = {
    [P: string]: ValueSourceOf<SOURCE> | DataToProject2<SOURCE>
    // Source si here to improve TS error messages
    [source]?: SOURCE
}

type DataToProject2</*in|out*/ SOURCE extends NSource> = {
    [P: string]: ValueSourceOf<SOURCE> | DataToProject3<SOURCE>
    // Source si here to improve TS error messages
    [source]?: SOURCE
}

type DataToProject3</*in|out*/ SOURCE extends NSource> = {
    [P: string]: ValueSourceOf<SOURCE> | DataToProject4<SOURCE>
    // Source si here to improve TS error messages
    [source]?: SOURCE
}

type DataToProject4</*in|out*/ SOURCE extends NSource> = {
    [P: string]: ValueSourceOf<SOURCE> | DataToProject5<SOURCE>
    // Source si here to improve TS error messages
    [source]?: SOURCE
}

type DataToProject5</*in|out*/ SOURCE extends NSource> = {
    [P: string]: ValueSourceOf<SOURCE>
    // Source si here to improve TS error messages
    [source]?: SOURCE
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type DataToProjectOfAny = {
    [P: string]: AnyValueSource | DataToProjectOfAny2
}

type DataToProjectOfAny2 = {
    [P: string]: AnyValueSource | DataToProjectOfAny3
}

type DataToProjectOfAny3 = {
    [P: string]: AnyValueSource | DataToProjectOfAny4
}

type DataToProjectOfAny4 = {
    [P: string]: AnyValueSource | DataToProjectOfAny5
}

type DataToProjectOfAny5 = {
    [P: string]: AnyValueSource | DataToProjectOfAny
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type DataToProjectOf<T> = {
    [P: string]: T | DataToProjectOf2<T>
}

type DataToProjectOf2<T> = {
    [P: string]: T | DataToProjectOf3<T>
}

type DataToProjectOf3<T> = {
    [P: string]: T | DataToProjectOf4<T>
}

type DataToProjectOf4<T> = {
    [P: string]: AnyValueSource | DataToProjectOf5<T>
}

type DataToProjectOf5<T> = {
    [P: string]: T | DataToProjectOfAny
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type GetDataToProjectSource<TYPE> = ({
    [KEY in keyof TYPE]-?: TYPE[KEY] extends ValueSourceOf<infer SOURCE> ? SOURCE : GetDataToProjectSource2<TYPE[KEY]>
})[keyof TYPE]

type GetDataToProjectSource2<TYPE> = ({
    [KEY in keyof TYPE]-?: TYPE[KEY] extends ValueSourceOf<infer SOURCE> ? SOURCE : GetDataToProjectSource3<TYPE[KEY]>
})[keyof TYPE]

type GetDataToProjectSource3<TYPE> = ({
    [KEY in keyof TYPE]-?: TYPE[KEY] extends ValueSourceOf<infer SOURCE> ? SOURCE : GetDataToProjectSource4<TYPE[KEY]>
})[keyof TYPE]

type GetDataToProjectSource4<TYPE> = ({
    [KEY in keyof TYPE]-?: TYPE[KEY] extends ValueSourceOf<infer SOURCE> ? SOURCE : GetDataToProjectSource5<TYPE[KEY]>
})[keyof TYPE]

type GetDataToProjectSource5<TYPE> = ({
    [KEY in keyof TYPE]-?: TYPE[KEY] extends ValueSourceOf<infer SOURCE> ? SOURCE : never
})[keyof TYPE]

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type RequiredColumnNames<T> = 
    T extends AnyValueSource ? 'result' 
    : unknown extends T // this is the case when the arguments are of type any
    ? never : RequiredColumnNames1<T>

type RequiredColumnNames1<T> = { [K in keyof T]-?: 
    K extends string 
    ?
        T[K] extends AnyValueSource | undefined // Undefined is to deal with picking columns
        ? ({} extends Pick<T, K> ? never : `${K}`) 
        : RequiredColumnNames2<T[K], `${K}.`>
    : never
}[keyof T]

type RequiredColumnNames2<T, PREFIX extends string> = { [K in keyof T]-?: 
    K extends string 
    ?
        T[K] extends AnyValueSource | undefined // Undefined is to deal with picking columns
        ? ({} extends Pick<T, K> ? never : `${PREFIX}${K}`) 
        : RequiredColumnNames3<T[K], `${PREFIX}${K}.`>
    : never
}[keyof T]

type RequiredColumnNames3<T, PREFIX extends string> = { [K in keyof T]-?: 
    K extends string 
    ?
        T[K] extends AnyValueSource | undefined // Undefined is to deal with picking columns
        ? ({} extends Pick<T, K> ? never : `${PREFIX}${K}`) 
        : RequiredColumnNames4<T[K], `${PREFIX}${K}.`>
    : never
}[keyof T]

type RequiredColumnNames4<T, PREFIX extends string> = { [K in keyof T]-?: 
    K extends string 
    ?
        T[K] extends AnyValueSource | undefined // Undefined is to deal with picking columns
        ? ({} extends Pick<T, K> ? never : `${PREFIX}${K}`) 
        : RequiredColumnNames5<T[K], `${PREFIX}${K}.`>
    : never
}[keyof T]

type RequiredColumnNames5<T, PREFIX extends string> = { [K in keyof T]-?: 
    K extends string 
    ?
        T[K] extends AnyValueSource | undefined // Undefined is to deal with picking columns
        ? ({} extends Pick<T, K> ? never : `${PREFIX}${K}`) 
        : never
    : never
}[keyof T]
