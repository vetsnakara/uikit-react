/**
 * Генерирует набор страниц для пагинации
 * @param current {number} - текущая страница
 * @param total {number} - общее количество страниц
 * @param delta {number} - размер зазора вокруг текущей страницы
 * @param tail {number} - размер "хвостов"
 * @returns {[]}
 */
export function pagination(current: number, total: number, delta?: number, tail?: number): [];
