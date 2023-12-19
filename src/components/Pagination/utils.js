/**
 * Генерирует набор страниц для пагинации
 * @param current {number} - текущая страница
 * @param total {number} - общее количество страниц
 * @param delta {number} - размер зазора вокруг текущей страницы
 * @param tail {number} - размер "хвостов"
 * @returns {[]}
 */
export function pagination(current, total, delta = 2, tail = 1) {
    // Prevent errors
    if (typeof total !== "number" || !total) {
        total = 1;
        console.warn("Pagination: param `total` is required. Autofixed");
    }
    if (current > total) {
        current = total;
        console.warn("Pagination: param `current` more than `total`. Autofixed");
    }

    // Pagination parts
    var lPart = [],
        rPart = [],
        Space = ["…"];

    // Make left part (with improve 1 ... 3 4)
    // Если между (current - delta) и (tail) есть 2 и более пунктов
    if (total >= 10 && current - delta - tail >= 2) {
        var lTail = _.range(1, tail + 1),
            lDelta;
        if (current > total - 3) {
            lDelta = _.range(total - 4, current);
        } else {
            lDelta = _.range(current - delta, current);
        }
        lPart = lPart.concat(lTail, Space, lDelta);
    } else {
        lPart = _.range(1, current);
    }

    // Make right part (with improve 6 7 ... 9)
    // Если между (current + delta) и (tail) есть 2 и более пунктов
    if (total >= 10 && total - 2 >= current + delta + tail - 1) {
        var rTail = _.range(1 + total - tail, 1 + total),
            rDelta;
        if (current < 4) {
            rDelta = _.range(1 + current, 6);
        } else {
            rDelta = _.range(1 + current, 1 + current + delta);
        }

        rPart = rPart.concat(rDelta, Space, rTail);
    } else {
        rPart = _.range(1 + current, 1 + total);
    }

    // Additional optimization
    // If current page + tails + deltas is more pages than total
    if (1 + (tail + delta) * 2 >= total) {
        return _.range(1, 1 + total);
    }

    return [].concat(lPart, current, rPart);
}
