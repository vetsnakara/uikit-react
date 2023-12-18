/**
 * Страница входящих заявок учебных заведений
 **/

(function () {
    var CONTRACT_CATALOG = "CONTRACT";
    var COOPERATION_CATALOG = "COOPERATION";
    var INSTITUTION_CATALOG = "INSTITUTION";
    var SCHOOL_ROLE = "Учебное заведение";
    var FL_ROLE = "Кандидат";
    var ORG_ROLE = "Работодатель";
    var isSchool = false;
    var isEmployer = false;
    var isFL = false;
    var userData = [];

    if (currentUser) {
        var details = JSON.parse(currentUser.externalData || "{}");
        var filter = {};

        if (_.has(details , "inn") && !_.isNull(details .inn)) {
            filter["inn"] = [details .inn];
        }

        if (_.has(details , "kpp") && !_.isNull(details ["kpp"])) {
            filter["kpp"] = [details .kpp];
        }

        if (_.has(details , "ogrn") && !_.isNull(details .ogrn)) {
            filter["ogrn"] = [details .ogrn];
        }
        if (_.keys(filter).length) {
            getCatalogData(INSTITUTION_CATALOG, filter).done(function (response) {
                userData = response.result.data[0] || [];
            })
        }
    }

    $(document).on("tile-catalog:draw", function (event, ib) {
        var ib = $(ib);

        $("div.modal[role=dialog]", ib).off("show.bs.modal").on("show.bs.modal", function () {
            var dialog = $(this);
            var id = dialog.data("uid");
            var file = dialog.data("file");
            var fileInput = $("input[type=file]", dialog);
            var file = $("[ref=file-download]", dialog).data("file");

            getFileEnum(file).done(function (response) {
                var link;
                var name;
                if (_.has(response, "attachs")) {
                    link = "/api/archive/download/"+response.attachs[0].file;
                    name = response.attachs[0].fileName;
                    $("[ref=file-download] .file-preview", dialog).text(name);
                    $("[ref=file-download] a", dialog).attr("href", link);
                    $("[ref=file-download] a", dialog).attr("target", "_blank");
                    if(response.attachs.length > 1){
                        response.attachs.forEach(function (item) {
                            if (item.extId === file) {
                                link = "/api/archive/download/"+item.file;
                                name = item.fileName;
                            }
                        });
                    } else {
                        link = "/api/archive/download/"+response.attachs[0].file;
                        name = response.attachs[0].fileName;
                    }
                } else {
                    link = file;
                    name = "Договор"
                }
                $("[ref=file-download] .file-preview", dialog).text(name);
                $("[ref=file-download] a", dialog).attr("href", link);
                $("[ref=file-download] a", dialog).attr("target", "_blank");
            });

            fileInput.off("change").on("change", function () {
                $('.upload__file', dialog).text(fileInput.get(0).files[0].name);
            });

            $("button[ref=contract-create]", ib).off("click").on("click", function () {
                createFile(fileInput.get(0).files).done(function (response) {
                    var data = prepageRequestData(dialog);
                    data["file"] = response["extId"];
                    $.when(
                        createCooperation(data), 
                        createContract(data)
                    ).then(function(cooperationResponse, contractResponse) {
                        var ids = {
                            user: currentUserFull.id,
                            employer: data.id_employer,
                            institution: data.id_institution,
                            cooperation: cooperationResponse[0].result.data // id of new cooperation
                        };

                        return notifyUsers(ids);
                    }).then(function () {
                        dialog.modal('hide');
                    }).catch(function(err) {
                        console.error(err);
                    });
                })
            })
        });
    })

    function prepageRequestData(wrapper) {
        return {
            cooperation_type: "Партнерское соглашение",
            request_code: wrapper.data("uid"),
            id_institution: userData[0],
            id_employer: wrapper.data("employer"),
            made_contract: Date.now(),
            prof_activity_code: wrapper.data("profactivitycode"),
            code: wrapper.data("code"),
            interaction_region: wrapper.data("region"),
            interaction_city: wrapper.data("city"),
            id_contract: createUUID1(),
            id_cooperation: createUUID1(),
            contract_number: $("input[ref=contract-number]", wrapper).val(),
            contract_date: Date.now(),
            contract_duration: $("input[ref=contract-duration]", wrapper).val()
        }
    }

    /**
     * Добавляем заявку
     * @param data
     */
    function createCooperation(data){
        var dataArr = [
            data.id_cooperation,
            data.cooperation_type,
            data.request_code,
            data.id_contract,
            "",
            data.id_institution,
            data.id_employer,
            "",
            null,
            null,
            "",
            "",
            "",
            null,
            null,
            "Новый",
            false,
            data.made_contract,
            null,
            null,
            null,
            null,
            null,
            null,
            data.interaction_region,
            data.interaction_city,
            data.prof_activity_code,
            data.code,
            false,
            null,
            null,
            "",
            "",
            false,
        ];
        var url = "//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/store?" +
            "code=" + COOPERATION_CATALOG + "&" +
            "id=" + data.id_cooperation + "&" +
            "unique_request_identifier=" + _.uniqueId("COOPERATION_CATALOG_") + "&" +
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
     * ! ДУБЛИКАТ
     * Отправить уведомления о взаимодействии всем,
     * кроме инициатора взаимодействия
     */
    function notifyUsers(ids) {
        var recepientIds = [
            ids.student,
            ids.employer,
            ids.institution
        ].filter(function (id) {
            // 1. студента может не быть (studentId = undefined)
            // 2. не отправляем уведомление ицициатору
            return id && id !== ids.user;
        }),

        data = {
            id_cooperation: ids.cooperation,
            date: Date.now(),
            reading_marker: false,
            text: "",
            id_student: ids.student,
            id_institution: ids.institution,
            id_employer: ids.employer,
        },

        deferreds = recepientIds.map(function (id) {
            return sendNotification(id, data);
        });

        return $.when.apply($, deferreds);
    }

    /**
     * Добавляем заявку
     * @param data
     */
    function createContract(data){
        var dataArr = [
            data.id_contract,
            data.contract_number,
            null,
            data.id_institution,
            data.id_employer,
            "",
            data.file,
            false,
            false,
            false,
            data.cooperation_type,
            data.request_code,
            data.id_cooperation,
            data.contract_duration,
            0
        ];
        var url = "//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/store?" +
            "code=" + CONTRACT_CATALOG + "&" +
            "id=" + data.id_contract + "&" +
            "unique_request_identifier=" + _.uniqueId("COOPERATION_CATALOG_") + "&" +
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
        data.append('docNumber', createUUID1());
        data.append('docTypeCode', "studDoc");
        data.append('extId', createUUID1());
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
})();
