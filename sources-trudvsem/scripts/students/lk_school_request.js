(function () {
    var EMPLOYER_CATALOG = "EMPLOYER";
    //var ACTIVITY_AREA_CATALOG = "ACTIVITY_AREA";
    //var DEMANDED_PROFESSIONS_CATALOG = "DEMANDED_PROFESSIONS";

    var id_employer_col = 0;

    var url = "";

    var userID = currentUser.id || "";
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

    new bft_JoinSource({
        sources: ["_request_source"],
        initHandler: function (response) {
            response = response["_request_source"];
            url = response.url.split("/getData/")[0];
            prepareJoinData(JSON.parse(JSON.stringify(response.data)))
        },
        handler: function (response) {

        }
    });

    function prepareJoinData(data) {
        var employer = [];

        data.forEach(function (row) {
            employer.push(row[id_employer_col]);
        })
    }

    function getFromCatalog (catalog, filter) {
        var url = orgUrlData.host+"/api/1.2/catalog/create?"+
            "code="+catalog+"&"+
            "unique_request_identifier="+_.uniqueId("_lk_school_request")+"&"+
            "filter="+encodeURIComponent(JSON.stringify(filter));
            "version=1.2";


        var options = {
            url: url,
            dataType: "json",
            contentType: "application/json",
            method: "POST",
        };
        return $.ajax(options)
    }


})()
