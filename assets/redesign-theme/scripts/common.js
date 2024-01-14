/**
 * Склонение числительныйх пример pluralize(number, ['найдена', 'найдено', 'найдены']);
 * Первый элемент title —
 *  когда число заканчивается на 1,
 *  второй - когда число заканчивается на 2,
 *  третий — когда число заканчивается на 0
 * @param number
 * @param titles
 * @returns {*}
 */
window.pluralize = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    number = String(number).replace(/\D+/g, "");
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

/**
 * Перевод размера файл в байтах в сокращенное наивменование
 * @param bytes - размер в байтах
 * @param si - единицы измерения СИ
 * @param dp - количество знаков после запятой
 * @return {string}
 */
window.humanFileSize = function (bytes, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + " B";
    }

    const units = si
        ? ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
        : ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(dp) + " " + units[u];
};

/**
 * Проверка является ли пользователь Работодателем
 */

window.isEmployerRole = function () {
    return _.has(window, "currentUserFull") && currentUserFull !== null
        ? _.values(currentUserFull.roles || {}).indexOf("Работодатель") > -1
        : false;
};

/**
 * Проверка является ли пользователь Соискателем
 */
window.isCandidateRole = function () {
    return _.has(window, "currentUserFull") && currentUserFull !== null
        ? _.values(currentUserFull.roles || {}).indexOf("Кандидат") > -1
        : false;
};

/**
 * устанавливает cookie с именем name и значением value
 * options - объект с свойствами cookie (expires, path, domain, secure)
 */
window.setCookie = function (name, value, options = {}) {
    var expires = options.expires;
    var d;
    var updatedCookie;

    if (typeof expires === "number" && expires) {
        d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        options.expires = d;
        expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    updatedCookie = name + "=" + encodeURIComponent(value);

    Object.keys(options).forEach(function (propName) {
        var propValue = options[propName];
        updatedCookie += "; " + propName;

        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    });

    document.cookie = updatedCookie;
};

/**
 * возвращает cookie с именем name, если есть,
 * undefined, если нет
 */
window.getCookie = function (name) {
    var matches = document.cookie.match(
        new RegExp("(?:^|; )" + name.replace(/([.*+?\^${}()|\[\]\/\\])/g, "\\$1") + "=([^;]*)")
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

/**
 * удаляет cookie с именем name
 */
window.deleteCookie = function (name, path, domain) {
    setCookie(name, "", {
        expires: -1,
        path: path,
        domain: domain,
    });
};

/**
 * изменить cookie с именем name
 */
window.updateCookie = function (name, value, options) {
    deleteCookie(name, options.path, options.domain);
    setCookie(name, value, options);
};

/**
 * Коорректировка timestamp к заданной таймзоне
 *
 * Функция формирует timestamp такми образом, чтобы при формировании
 * строкового представления даты в таймзоне Europe/Moscow была получена
 * такая же дата, как и локальной таймзоне. Время отбрасывается.
 *
 * @param {*} timestamp -
 * @returns
 */
window.convertTimestampToTimezone = function (timestamp) {
    var date = dayjs(timestamp);
    var tzDiff = "+03";
    if (date.year() === 1992) {
        if (date.isBefore("1992-01-19")) {
            tzDiff = "+02";
        } else if (date.isBefore("1992-03-29")) {
            tzDiff = "+03";
        } else if (date.isBefore("1992-09-27")) {
            tzDiff = "+04";
        } else {
            tzDiff = "+03";
        }
    } else if (date.year() === 1991) {
        if (date.isAfter("1991-09-29")) {
            tzDiff = "+02";
        }
    } else if (
        date.utcOffset() > date.clone().month(0).utcOffset() ||
        date.utcOffset() > date.clone().month(5).utcOffset()
    ) {
        tzDiff = "+04";
    }
    return dayjs(date.format("YYYY-MM-DDTHH:mm:00" + tzDiff + ":00")).valueOf();
};

/**
 * Возвращает статус в соответствии со статусной моделью
 */
window.getStatus = function (sn, tp) {
    let s,
        c = "status";

    switch (sn) {
        case "project":
            s = "Новый";
            break;
        case "signing":
            s = "На подписании";
            break;
        case "concluded":
            s = "Заключён";
            c = "status status_success";
            break;
        case "notStarted":
            s = "Не начат";
            c = "status status_success";
            break;
        case "executing":
            s = "Прохождение " + (tp === "PRACTICE" ? "практики" : "стажировки");
            c = "status status_success";
            break;
        case "finished":
            s = (tp === "PRACTICE" ? "Практика" : "Стажировка") + " закончена";
            c = "status status_success";
            break;
        case "completed":
            s = "Исполнен";
            c = "status status_success";
            break;
        case "rejected":
            s = "Отклонён";
            c = "status status_danger";
            break;
        case "deleted":
            s = "Удалён";
            c = "status status_danger";
            break;
        case "expired":
            s = "Истёк";
            c = "status status_muted";
            break;
        default:
            s = sn;
    }

    return { status: s, class: c };
};

/**
 * Валидация файла
 * @param {File} file - валидируемый файл
 * @param {number} options.maxSize - максимальный размер файла в байтах
 * @param {string[]} options.allowedExtensions - массив рзарешённых расширений
 * @return {Object} объект результатов валидации
 */
window.checkFile = function (file, options) {
    options = options || {};

    var maxSize = options.maxSize;
    var allowedExtensions = options.allowedExtensions;

    var errors = {};

    var fileExt = file.type.split("/")[1];

    // check size
    if (maxSize && file.size > maxSize) {
        errors.maxSize = true;
    }

    // check type
    if (allowedExtensions && !_.contains(allowedExtensions, fileExt)) {
        errors.ext = true;
    }

    return _.isEmpty(errors) ? null : errors;
};

/**
 * Валидация email
 * @param email - электронная почта
 * @return boolean
 */
window.checkEmail = function (mail) {
    var emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/;
    if (_.isEmpty(mail)) {
        return false;
    }
    return emailReg.test(mail);
};

/**
 * Валидация URL
 * @param url - адрес
 * @return boolean
 */
window.isValidUrl = function (url) {
    try {
        return Boolean(new URL(url));
    } catch (e) {
        return false;
    }
};

/**
 * Форматирование больших чисел по разрядам
 * @param {number} value - число для форматирования
 * @param {boolean} [nbsp] - разделять разряды
 * @returns {string} - отформатированое число
 */
window.bigNumberFormat = function (value, nbsp) {
    var nbsp = !!_.isUndefined(nbsp);
    if (_.isNaN(value) || _.isNull(value) || _.isUndefined(value)) {
        return value;
    }

    var tpl = nbsp ? "$1&nbsp;" : "$1 ";

    var regEx = /(\d)(?=(\d\d\d)+([^\d]|$))/g;
    return String(value).replace(regEx, tpl);
};
