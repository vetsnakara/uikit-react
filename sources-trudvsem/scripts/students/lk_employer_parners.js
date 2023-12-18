/**
 * Страница партнеров работодателя
 **/

$(function () {
    var modal = $("#create_contract");
    var DS_HOST = "";
    var STUDENT_CATALOG = "STUDENT";
    var ACTIVITY_AREA_CATALOG = "ACTIVITY_AREA";
    var DEMANDED_PROFESSIONS_CATALOG = "DEMANDED_PROFESSIONS";
    var CONTRACT_CATALOG = "CONTRACT";
    var COOPERATION_CATALOG = "COOPERATION";
    var selectedActivity = {};
    var contractData = {
        contract_id: createUUID1(),
        cooperation_id: createUUID1(),
        contract_number: "",
        id_institution: "",
        id_employer: "",
        id_student: "",
        contract_url: "",
        type_of_contract: "",
        seats_number: null,
        start_date: "",
        end_date: "",
        interaction_region: "",
        interaction_city: "",
        prof_activity_code: "",
        code: "",
        task: ""
    }

    new bft_JoinSource({
        sources: ["_partners_source"],
        initHandler: function (response) {
            var data = response["_partners_source"];
            var url = data.url.split("/getData/");
            DS_HOST = url[0];
        },
        handler: null
    });

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
        data.append('name', 'Договор №'+contractData.contract_number);
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

    /**
     * Добавляем заявку
     * @param data
     */
    function createCooperation(data) {
        var params = [
            data.cooperation_id,
            data.type_of_contract,
            "",
            data.contract_id,
            data.id_student,
            data.id_institution,
            data.id_employer,
            "",
            data.start_date,
            data.end_date,
            data.task,
            "",
            null,
            "",
            "",
            "Новый",
            "",
            Date.now(),
            "",
            "",
            "",
            "",
            "",
            "",
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
            "id=" + data.cooperation_id + "&" +
            "unique_request_identifier=" + _.uniqueId("COOPERATION_CATALOG_") + "&" +
            "data=" + encodeURIComponent(JSON.stringify(params)) + "&" +
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
        var params = [
            data.contract_id,
            data.contract_number,
            null,
            data.id_institution,
            data.id_employer,
            data.id_student,
            data.contract_url,
            false,
            false,
            false,
            data.type_of_contract,
            "",
            data.cooperation_id,
            null,
            data.seats_number
        ];
        var url = "//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/store?" +
            "code=" + CONTRACT_CATALOG + "&" +
            "id=" + data.contract_id + "&" +
            "unique_request_identifier=" + _.uniqueId("COOPERATION_CATALOG_") + "&" +
            "data=" + encodeURIComponent(JSON.stringify(params)) + "&" +
            "version=1.2";
        var options = {
            url: url,
            dataType: "json",
            contentType: "application/json",
            method: "POST",
        };

        return $.ajax(options)
    }


    modal.off("show.bs.modal").on("show.bs.modal", function (event) {
        var button = $(event.relatedTarget);
        var dialog = $(this);
        var fileInput = $("input[name=contract_file]", dialog);

        fileInput.off("change").on("change", function () {
            fileInput
              .closest(".upload")
              .find(".upload__file")
              .text(fileInput.get(0).files[0].name);
        });

        $(".professions__subtitle", dialog).text(decodeURIComponent(button.data("employername")));

        $(".button[rel=submit]", dialog).off("click").on("click", function() {
            contractData.id_employer = button.data("employer");
            contractData.id_institution = button.data("institution");
            contractData.id_student = $("select[name=candidade]", dialog).val() || "";
            contractData.contract_number = $("input[name=number]", dialog).val();
            contractData.type_of_contract = $("select[name=interaction]", dialog).val();
            contractData.start_date = $("input[name=start_date]", dialog).val() || "";
            contractData.end_date = $("input[name=end_date]", dialog).val() || "";
            contractData.interaction_region = $("select[name=region]", dialog).val() || "";
            contractData.interaction_city = $("select[name=city]", dialog).val() || "";
            contractData.prof_activity_code = $("select[name=profession-area]", dialog).val() || "";
            contractData.code = $("select[name=profession]", dialog).val() || "";
            contractData.task = $("textarea[name=description]", dialog).val();

            if (moment(contractData.start_date, "DMY").isValid()) {
                contractData.start_date = moment(contractData.start_date, "DMY").valueOf()
            }

            if (moment(contractData.end_date, "DMY").isValid()) {
                contractData.end_date = moment(contractData.end_date, "DMY").valueOf()
            }

            createFile(fileInput.get(0).files).done(function (response) {
                contractData.contract_url = response["extId"];
                $.when(
                    createCooperation(contractData), 
                    createContract(contractData)
                ).then(function(cooperationResponse, contractResponse) {
                    var ids = {
                        user: currentUserFull.id,
                        student: contractData.id_student,
                        employer: contractData.id_employer, //! bug(?): button.data("employer") === undefined для 1ой ссылки "Создать договор"
                        institution: contractData.id_institution,
                        cooperation: cooperationResponse[0].result.data // id of new cooperation
                    };

                    return notifyUsers(ids);
                }).then(function () {
                    dialog.modal('hide');
                }).catch(function(err) {
                    console.error(err);
                });

                console.log(contractData);
            })
        });

        $.ajax({
            url: DS_HOST + "/api/1.2/catalog/data/" + STUDENT_CATALOG + "?unique_request_identifier=" + _.uniqueId("query_"),
            type: 'GET',
            dataType: "json"
        }).done(function (response) {
            $("select[name=candidade]").select2({
                allowClear: true,
                placeholder: "Выберите кандидата",
                data: response.result.data.map(function (item) {
                    return {
                        id: item[0],
                        text: item[1]
                    }
                })
            })
        })

        $.ajax({
            url: "https://test-integration.trudvsem.ru/api/dictionary/get?code=DICT_REGION",
            type: 'GET',
            dataType: "jsonp"
        }).done(function (response) {
            $("select[name=region]", dialog).select2({
                allowClear: true,
                placeholder: "Выберите регион",
                data: response.map(function (item) {
                    return {
                        id: String(item.name),
                        text: String(item.name)
                    }
                })
            })
        });

        $("select[name=interaction]", dialog).select2({
            allowClear: true,
            minimumResultsForSearch: -1,
            placeholder: "Выберите вид взаимодействия",
        });

        $("select[name=profession-area]").select2({
            cache: true,
            /*minimumResultsForSearch: Infinity,*/
            placeholder: "Выберите...",
            allowClear: true,
            ajax: {
                dataType: 'json',
                url: DS_HOST + "/api/1.2/catalog/data/" + ACTIVITY_AREA_CATALOG,
                data: function (params) {
                    var query = {
                        unique_request_identifier: _.uniqueId("query_"),
                    };
                    if (params.term && params.term.length) {
                        query.filter = JSON.stringify({
                            name: [String(params.term).toLocaleLowerCase()]
                        })
                    }
                    return query
                },
                processResults: function (data) {
                    return {
                        results: data.result.data.map(function (item) {
                            return {
                                cid: item[1],
                                id: item[0],
                                text: item[4]
                            }
                        })
                    }
                }
            }
        }).off('select2:select').on("select2:select", function (e) {
            selectedActivity = e.params.data;
            $("select[name=profession]").val(null).trigger("change")
        });

        $("select[name=profession]").select2({
            cache: true,
            placeholder: "Выберите...",
            allowClear: true,
            ajax: {
                dataType: 'json',
                url: DS_HOST + "/api/1.2/catalog/data/" + DEMANDED_PROFESSIONS_CATALOG,
                data: function (params) {
                    var filter = {
                        profActivityCode: [selectedActivity.cid]
                    };
                    if (params.term && params.term.length) {
                        filter.name = [String(params.term).toLocaleLowerCase()]
                    }
                    return {
                        unique_request_identifier: _.uniqueId("query_"),
                        filter: JSON.stringify(filter)
                    }
                },
                processResults: function (data) {
                    return {
                        results: data.result.data.map(function (item) {
                            return {
                                cid: item[1],
                                id: item[0],
                                text: item[3]
                            }
                        })
                    }
                }
            }
        })
    })
})
