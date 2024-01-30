/**
 * Проверка корректности CНИЛС
 * https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BD%D1%82%D1%80%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5_%D1%87%D0%B8%D1%81%D0%BB%D0%BE#%D0%A1%D1%82%D1%80%D0%B0%D1%85%D0%BE%D0%B2%D0%BE%D0%B9_%D0%BD%D0%BE%D0%BC%D0%B5%D1%80_%D0%B8%D0%BD%D0%B4%D0%B8%D0%B2%D0%B8%D0%B4%D1%83%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BB%D0%B8%D1%86%D0%B5%D0%B2%D0%BE%D0%B3%D0%BE_%D1%81%D1%87%D1%91%D1%82%D0%B0_(%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F)
 * @param snilsStr
 * @returns {boolean}
 */
export function validateSnils(snilsStr: any): boolean;
/**
 * Проверка регулярного выражения на соответствие виду "^.{25}$"
 *
 * @param {string} reg - Регулярноне выражение в виде строки
 * @returns {boolean}
 */
export function isAnySymbolRegex(reg: string): boolean;
export function formatSnils(value: any): any;
export function formatDate(value: any): any;
