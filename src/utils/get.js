/**
 * Получение значения поля объекта на любом уровне вложенности
 *
 * @param {*} data
 * @param {*} path
 * @param {*} defaultValue
 * @returns
 */
export function get(data, path, defaultValue) {
    const value = path
        .split(/[.[\]]/)
        .filter(Boolean)
        .reduce((value, key) => value?.[key], data);

    return value !== undefined ? value : defaultValue;
}
