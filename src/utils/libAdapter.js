const libsCache = {};

// todo: types!
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

// todo: rename?
/**
 * @param {Record<"ReactHookForm" | "ReactQuery", object>} libsObj
 * @returns
 */
export const initLib = (libsObj) => {
    Object.assign(libsCache, libsObj);

    const names = Object.keys(libsObj);

    return names.length === 1 ? libsObj[names[0]] : libsObj;
};
