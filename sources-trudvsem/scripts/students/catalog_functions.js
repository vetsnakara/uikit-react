/**
 * Полуаем данные от каталога
 * @param catalog
 * @param filter
 * @returns {jQuery}
 */
function getCatalogData(catalog, filter) {
    var url = "//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/data/" +
        catalog + "?" +
        (filter ? "filter=" + encodeURIComponent(JSON.stringify(filter)) + "&" : "") +
        "unique_request_identifier=" + _.uniqueId("mainpage_stat_") + "&" +
        "version=1.2";

    if (!catalog) return false;

    var options = {
        url: url,
        dataType: "json",
        contentType: "application/json",
        method: "GET",
    };

    return $.ajax(options)
}

/**
 * Полуаем запись из каталога
 * @param catalog
 * @returns {jQuery}
 */
function getCatalogItem(catalogName, itemId) {
    var url = "//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/dataItem/" +
        catalogName + "/" +
        itemId + "?" +
        "unique_request_identifier=" + _.uniqueId("STUDENTS_");

    var options = {
        url: url,
        dataType: "json",
        contentType: "application/json",
        method: "GET",
    };

    return $.ajax(options)
        .then(function(response) {
            var result = response.result;
            var code = result.code;
            if (code !== "SUCCESS") {
                throw new Error(result.comment);
            }
            return result.data;
        })
}

/**
 * Обновляет поля в каталоге
 * @param host
 * @param params - параметры идентификации каталога
 *  dataSourceId
    dataVersion,
    sortId
    id
 * @param fields - словарь { ... %код колонки% : %значение%, ... }
 * @returns {jQuery}
 */
function setFields(host, params, fields) {
    /*var params = {
        dataSourceId: self.inicDS.id,
        dataVersion: self.inicDS.version,
        sortId: self.inicDS.sortId,
        id: self._iniciativeID,
    };*/
    params = _.map(params, function (val, key) {
        return key + "=" + encodeURIComponent(val)
    });
    params = params.join("&");
    var body = fields;
    var url = host + "/data/save-fields?" + params;
    return $.ajax({
        url: url,
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(body),
        method: "POST",
    });
}


/**
 * Получаем название работодателя для селектов инфоблока фильтр
 * @param id
 * @returns {*}
 */
function getEmployerByCodeForSelect(id) {
    getCatalogData("EMPLOYER", { id: id }).done(function (response) {
        var data = response.result.data;
        if (data && data.length) {
            var el = $("option[value='" + id + "']");
            if (el.text().trim() === id) {
                el.text(data[0][1]);
            }

            var select = el.closest('select');
            if(select.data('select2')) {
                select.select2("destroy")
            }
            select.select2();
        }
    });
    return id;
}

/**
 * Получаем название работодателя для селектов инфоблока фильтр
 * @param id
 * @returns {*}
 */
function getInstitutionByCodeForSelect(id) {
    getCatalogData("INSTITUTION", { id: id }).done(function (response) {
        var data = response.result.data;
        if (data && data.length) {
            var el = $("option[value='" + id + "']");
            if (el.text().trim() === id) {
                el.text(data[0][2]);
            }
            var select = el.closest('select');
            if(select.data('select2')) {
                select.select2("destroy")
            }
            select.select2();
        }
    });
    return id;
}

/**
 * Получаем название Области профдеятельности
 * @param id
 * @returns {*}
 */
function closureGetActivityAreaNameByCode() {
    var cache = {};

    getCatalogData("ACTIVITY_AREA").done(function (response) {
        var data = response.result.data;
        if (data && data.length) {
            for (var i = 0; i < data.length; i++) {
                var id = data[i][0];
                var name = data[i][4];
                cache[id] = name;
            }
        }
    });

    return function (id) {
        if (cache[id]) return cache[id];
    }
}
var getActivityAreaNameByCode = closureGetActivityAreaNameByCode();

/**
 * Получаем статус практики
 * @param status
 * @returns {*}
 */
function getPracticeStatusByBoolean(status) {
    // status can be a string or boolean or null
    return status && status.toString() == "true" ? 'Пройдена' : 'Не пройдена'
}

/**
 * Получаем статус трудоустройства
 * @param status
 * @returns {*}
 */
function getEmploymentStatusByBoolean(status) {
    // status can be a string or boolean
    return status && status.toString() == "true" ? 'Трудоустроен' : 'Не трудоустроен'
}

/**
 * Удаляем студента из каталога
 * Вероятно этому здесь не место
 * @param id
 * @returns {*}
 */
function removeStudentFromCatalog(id) {
    var url = "//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/delete?" +
        "code=STUDENT&" +
        "id=" + id + "&" +
        "unique_request_identifier=" + _.uniqueId("STUDENT_") + "&" +
        "version=1.2";
    var options = {
        url: url,
        dataType: "json",
        contentType: "application/json",
        method: "DELETE",
    };
    $.ajax(options).done(function() {
        document.location.reload(true);
    })
}

/**
 * Получаем название Области профдеятельности для селектов инфоблока фильтр
 * @param id
 * @returns {*}
 */
function getActivityAreaByCodeForSelect(id) {
    var filter = {
        code: id
    };
    if (id.indexOf("-") > -1) {
        filter = {
            id: id
        }
    }
    getCatalogData("ACTIVITY_AREA", filter).done(function (response) {
        var data = response.result.data;
        if (data && data.length) {
            var el = $("option[value='" + id + "']");
            if (el.text().trim() === id) {
                el.text(data[0][4]);
            }

            var select = el.closest('select');
            if(select.data('select2')) {
                select.select2("destroy")
            }
            select.select2();
        }
    });
    return id;
}


function getProfessionByCodeForSelect(id) {
    var filter = {
        code: id
    };
    if (id.indexOf("-") > -1) {
        filter = {
            id: id
        }
    }
    getCatalogData("DEMANDED_PROFESSIONS", filter).done(function (response) {
        var data = response.result.data;
        if (data && data.length) {
            var el = $("option[value='" + id + "']");
            if (el.text().trim() === id) {
                el.text(data[0][3]);
            }

            var select = el.closest('select');
            if(select.data('select2')) {
                select.select2("destroy")
            }
            select.select2();
        }
    });
    return id;
}

function countPartnership(id) {
    getCatalogData("PARTNERSHIP", { id: id }).done(function (response) {
        console.log(response);
    })
}

/**
 * Получаем данные довукентаиз бфт-помойки
 * @param id
 */
function getDocData(id, typeCode) {
    return $.ajax({
        url: '/api/archive/documentFull?extId=' + id + "&systemCode=intern&typeCode=studDoc",
        type: 'GET'
    })
}

/**
 * Получаеть данные о прикрепленном договоре
 * @param id - id договора
 * @returns {*}
 */
function getFileEnum(id) {
    return $.get("/api/archive/documentFull?extId=" + id + "&systemCode=intern&typeCode=studDoc")
}

/**
 * Отправить уведомление
 */
function sendNotification(recipientId, data) {
    var params = [
        recipientId,
        data.id_cooperation,
        data.date,
        data.reading_marker,
        data.text,
        data.id_student,
        data.id_institution,
        data.id_employer,
    ];

    var url =
        "//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/create?" +
        "code=NOTIFICATIONS&" +
        "data=" +
        encodeURIComponent(JSON.stringify(params)) +
        "&" +
        "unique_request_identifier=" +
        _.uniqueId("PC_");

    var options = {
        url: url,
        dataType: "json",
        contentType: "application/json",
        method: "POST",
    };

    return $.ajax(options);
}