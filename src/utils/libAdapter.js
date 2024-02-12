/**
 * @file Функции для работы с библиотеками, использующими провайдер
 *
 * todo: description
 *
 * todo: set correct types for functions
 * todo: rename initLib
 */

const libsCache = {};

/**
 * @param {string | string[]} names
 * @returns
 */
export const getLib = (names) => {
    if (typeof names === "string") return libsCache[names];

    return Object.entries(libsCache).reduce(
        names,
        (acc, [name, lib]) => ({
            ...acc,
            [name]: lib,
        }),
        {}
    );
};

/**
 * @param {Record<"ReactHookForm" | "ReactQuery", object>} libsObj
 * @returns
 */
export const initLib = (libsObj) => {
    console.log("--- initLib", libsObj);

    Object.assign(libsCache, libsObj);

    const names = Object.keys(libsObj);

    return names.length === 1 ? libsObj[names[0]] : libsObj;
};
