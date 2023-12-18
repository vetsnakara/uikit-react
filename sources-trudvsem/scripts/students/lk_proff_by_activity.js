/**
 * Страница профессиий области активности
 */

(function () {
    window["_prof_hash"] = {};
    var EMPLOYER_CATALOG_CODE = "EMPLOYER";
    var STUDENT_CATALOG = "STUDENT";
    var INSTITUTION_CATALOG = "INSTITUTION";
    var INTERNSHIP_REQUEST_CATALOG = "INTERNSHIP_REQUEST";
    var SCHOOL_ROLE = "Учебное заведение";
    var FL_ROLE = "Кандидат";
    var ORG_ROLE = "Работодатель";
    var isSchool = false;
    var isEmployer = false;
    var isFL = false;
    var userData = [];

    if (currentUserFull) {
        _.each(currentUserFull.roles, function (roles) {
            if (roles.indexOf(SCHOOL_ROLE) > -1) {
                isSchool = true;
            }
            if (roles.indexOf(FL_ROLE) > -1) {
                isFL = true;
            }
            if (roles.indexOf(ORG_ROLE) > -1) {
                isEmployer = true;
            }
        })
        var details = JSON.parse(currentUserFull.externalData || "{}");
        var filter = {};

        if (_.has(details, "inn") && !_.isNull(details.inn)) {
            filter["inn"] = [details.inn];
        }

        if (_.has(details, "kpp") && !_.isNull(details["kpp"])) {
            filter["kpp"] = [details.kpp];
        }

        if (_.has(details, "ogrn") && !_.isNull(details.ogrn)) {
            filter["ogrn"] = [details.ogrn];
        }
        if (_.keys(filter).length) {
            var catalogData = getCatalogData(isSchool ? INSTITUTION_CATALOG : isEmployer ? EMPLOYER_CATALOG_CODE : isFL ? STUDENT_CATALOG : '', filter);
            console.log(catalogData);
            catalogData.done(function (response) {
                userData = response.result.data[0] || [];
            })
        }
    }

    function getUserData(catalog) {
        var filter = {
            code: [code]
        };
        return getCatalogData(catalog, filter)
    }

    function getQueryParams() {
        var params = {};
        var query = window.location.search.slice(1);
        query = query.split("&");
        query.forEach(function (item) {
            var arr = item.split("=");
            params[arr[0]] = arr[1];
        });
        return params;
    }

    /**
     * Инициализация окна добавления профессии
     */
    function initAllDialogProfDialog() {
        var internshipRequestModal = $("#internship_request");
        var file = null;
        var button = null;

        internshipRequestModal.on("show.bs.modal", function (event) {
            button = $(event.relatedTarget);
        });

        $('input[type=file]', internshipRequestModal).on('change', function () {
            file = $(this).get(0).files;
            $('.upload__file', internshipRequestModal).text(file[0].name)
        });

        internshipRequestModal.off('submit').on('submit', function (e) {
            e.preventDefault();
            var data = prepareRequestData(internshipRequestModal);
            if (isSchool || isEmployer) {
                data.code = button.data("profuid") || null;
                data.prof_name = button.data("profession") || "";
                createFile(file).done(function(response) {
                    data["file"] = response["extId"];
                    createRequest(data).done(function () {
                        internshipRequestModal.modal('hide');
                    });
                });
            }
            return false;
        });
    }

    function prepareRequestData(wrapper) {
        var data = {
            request_description: $("textarea", wrapper).val(),
            prof_activity_code: window.__activity_area_uid,
            region_code: ($(".js_region", wrapper).val()).toString(),
            application_creation_date: moment().valueOf(),
            publication_status: false,
            prof_activity_name: window.__activity_area_name,
        };
        if (isSchool) {
            data["id_institution"] = userData[0];
        }
        if (isEmployer) {
            data["id_employer"] = userData[0]
        }
        if (isFL) {
            data["id_student"] = userData[0]
        }

        return data
    }

    /**
     * Добавляем заявку
     * @param data
     */
    function createRequest(data) {
        var dataArr = [
            createUUID(),
            data.request_description,
            data.region_code,
            "",
            data.file,
            data.prof_activity_code,
            data.code,
            data.id_institution || null,
            data.id_employer || null,
            data.id_student || null,
            "",
            "Партнерское соглашение",
            null,
            null,
            "",
            null,
            null,
            data.application_creation_date,
            "",
            "",
            data.region_code,
            data.prof_activity_name,
            data.prof_name,
            "",
            "",
            true
        ];


        var url = "//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/create?" +
            "code=" + INTERNSHIP_REQUEST_CATALOG + "&" +
            "unique_request_identifier=" + _.uniqueId("INTERNSHIP_REQUEST_") + "&" +
            "data=" + encodeURIComponent(JSON.stringify(dataArr)) + "&" +
            "version=1.2";
        var options = {
            url: url,
            dataType: "json",
            contentType: "application/json",
            method: "POST",
        };

        return $.ajax(options)
    }

    /**
     * Заливаем и создаем файл на файло попомйке
     */
    function createFile(files) {
        var data = new FormData();
        data.append('docDate', moment().format('YYYY-MM-DDT00:00:00'));
        data.append('docNumber', createUUID());
        data.append('docTypeCode', "studDoc");
        data.append('extId', createUUID());
        data.append('file', files[0]);
        data.append('name', 'Договор оферта');
        data.append('nomenclature', 'string');
        data.append('srcSystem', "intern");

        return $.ajax({
            url: '/api/archive/store',
            data: data,
            contentType: false,
            processData: false,
            type: 'POST'
        })
    }

    function createUUID() {
        return createUUID1();
    }

    window.initAllDialogProfDialog = initAllDialogProfDialog;
})()
