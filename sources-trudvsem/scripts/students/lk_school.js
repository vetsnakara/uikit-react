(function() {
    var PARTNERSHIP_CATALOG = "PARTNERSHIP";
    var INTERNSHIP_REQUEST_CATALOG = "INTERNSHIP_REQUEST";
    var CONTRACT_CATALOG = "CONTRACT";
    var STUDENT_CATALOG = "STUDENT";
    var CONCLUDED_CONTRACT = "заключен";
    var REQUEST_TYPE = "Партнерское соглашение";
    var REQUSET_STATUS = "Договор заведен";
    var CONTRACT_TYPE = ["Проведение практики", "Проведение стажировки"];

    var schoolID = "";

    //Пользователь набросок если надо быдет брать юзера из даннх страницы или печеньки
    new bft_JoinSource({
        sources: ["_employer_source"],
        initHandler: function(data) {
            var response = data["_employer_source"];

            var userDetails = JSON.parse(currentUser.externalData || "{}");
            var userFilter = {};
            if (_.has(userDetails, "inn") && !_.isNull(userDetails.inn)) {
                userFilter["inn"] = [userDetails.inn];
            }

            if (_.has(userDetails, "kpp") && !_.isNull(userDetails["kpp"])) {
                userFilter["kpp"] = [userDetails.kpp];
            }

            if (_.has(userDetails, "ogrn") && !_.isNull(userDetails.ogrn)) {
                userFilter["ogrn"] = [userDetails.ogrn];
            }

            var qUrl = response.url;
            qUrl =
                qUrl +
                (qUrl.indexOf("?") > -1 ? "&" : "?") +
                "filter=" +
                encodeURIComponent(JSON.stringify(userFilter));
            return $.get(qUrl).done(function(data) {
                var row = JSON.parse(data.data);
                if (row && row.length && row[0]) {
                    userDataQuery({
                        key: "school:catalog:id",
                        data: row[0][0],
                    });
                }
                schoolID = row[0][0];
                initStat();
                new bft_FilterEmulator({
                    code: "_employer_proxy",
                    data: {
                        columns: response.columns,
                        data: row,
                        actual_date: response.actual_date,
                        filters_values: response.filters_values,
                        filters_settings: response.filters_settings,
                        filters_titles: response.filters_titles,
                        url: response.url,
                        error: false,
                    },
                });
            });
            /**/
        },
        handler: null,
    });

    function initStat() {
        //Агрегация счетчиков
        var partnetFilter = {
            id_institution: [getLKUser()],
        };
        var requesFilter = {
            id_employer: ["EXISTS"],
        };
        var contractFilter = {
            id_institution: [getLKUser()],
            type_of_contract: CONTRACT_TYPE,
        };

        var studentFilter = {
            id_institution: [getLKUser()],
        };

        getCatalogData(PARTNERSHIP_CATALOG, partnetFilter).done(function(response) {
            var partnersCount = response.result.data.length || 0;
            $("[data-content=partners] .amount__value").text(partnersCount);
            $("[data-content=partners] .amount__label").text(
                pluralize(partnersCount, ["партнер", "партнера", "партнеров"])
            );
        });
        getCatalogData(INTERNSHIP_REQUEST_CATALOG, requesFilter).done(function(response) {
            var requestCount = response.result.data.length || 0;
            $("[data-content=requests] .amount__value").text(requestCount);
            $("[data-content=requests] .amount__label").html(
                pluralize(requestCount, ["запрос", "запроса", "запросов"]) + "<br /> от работодателя"
            );
        });

        getCatalogData(CONTRACT_CATALOG, contractFilter).done(function(response) {
            var chart = [0, 0, 0, 0];
            response.result.data.forEach(function(row) {
                if (String(row[10]).toLocaleLowerCase() === CONTRACT_TYPE[0].toLocaleLowerCase()) {
                    chart[0]++;
                    if (_.isArray(row[12]) && String(row[12][15]).toLowerCase() === CONCLUDED_CONTRACT) {
                        chart[1]++;
                    }
                } else {
                    chart[2]++;
                    if (_.isArray(row[12]) && String(row[12][15]).toLowerCase() === CONCLUDED_CONTRACT) {
                        chart[3]++;
                    }
                }
            });
            var max = _.max(chart);

            chart.forEach(function(value, index) {
                var percentage = max ? Math.round((value / max) * 100) : 0;
                $("div[ref=contract_type] .graph__value-" + (index + 1)).css("height", percentage + "%");
                $("div[ref=contract_type]  .graph__number-" + (index + 1)).text(value);
            });
        });

        getCatalogData(STUDENT_CATALOG, studentFilter).done(function(response) {
            var chart = [0, 0, 0, 0];
            chart[0] = response.result.data.length;
            response.result.data.forEach(function(row) {
                if (row[12] === true || row[14] === true) {
                    chart[1]++;
                }
                if (row[11] && parseInt(row[11]) < parseInt(moment().format("YYYY"))) {
                    chart[2]++;
                    chart[0]--;
                    if (row[16] === true) {
                        chart[3]++;
                    }
                }
            });
            var max = _.max(chart);

            chart.forEach(function(value, index) {
                var percentage = max ? Math.round((value / max) * 100) : 0;
                $("div[ref=student] .graph__value-" + (index + 1)).css("height", percentage + "%");
                $("div[ref=student]  .graph__number-" + (index + 1)).text(value);
            });
        });
    }

    /**
     * Просто обестка чтоб упростит работу
     * @returns {string}
     */
    var getLKUser = function() {
        return schoolID;
    };
})();
