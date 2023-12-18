/**
 * Главная страница ЛК Соискателя
 **/

$(function () {
    var STUDENT_CATALOG = "STUDENT";
    var studentID = "";

    if (currentUser && currentUser.snils && currentUser.snils.length) {
        var userFilter = {
            snils: [currentUser.snils]
        };
        getCatalogData(STUDENT_CATALOG, userFilter).done(function (response) {
            var row = response.result.data.length ? response.result.data[0] : [];
            if (row && row.length && row[0]) {
                userDataQuery({
                    key: "student:catalog:id",
                    data: row[0]
                });
                userDataQuery({
                    key: "student:snils",
                    data: row[2]
                });
                studentID = row[0];
            }

        })
    }
})
