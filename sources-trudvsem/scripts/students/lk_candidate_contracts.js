(function () {
    var COOPERATIONS_CATALOG = "COOPERATION";
    var STUDENTS_CATALOG = "STUDENT";
    var INSTITUTIONS_CATALOG = "INSTITUTION";
    var EMPLOYERS_CATALOG = "EMPLOYER";
    var NOTIFICATIONS_CATALOG = "NOTIFICATIONS";

    var USER_ROLE_CANDIDATE = "Кандидат";
    var USER_ROLE_EMPLOYER = "Работодатель";
    var USER_ROLE_INSTITUTION = "Учебное заведение";
    var USER_ROLE_UNKNOWN = "USER_ROLE_UNKNOWN";

    var USER_ROLES = [
        USER_ROLE_CANDIDATE,
        USER_ROLE_EMPLOYER,
        USER_ROLE_INSTITUTION
    ];

    var userRole = getUserRole(currentUserFull.roles);
    var userId = currentUserFull.id;

    var cooperationId;

    /**
     * Удаляем договор из каталога
     * @param id
     * @returns {*}
     */
    function removeContractFromCatalog(id) {
        var url = "//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/updateFields?" +
            "code=COOPERATION&" +
            "id=" + id + "&" +
            "unique_request_identifier=" + _.uniqueId("COOPERATION_") + "&" +
            "version=1.2";
        var options = {
            url: url,
            dataType: "json",
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify({
                "deleted": true
            })
        };
        $.ajax(options);
    }

    var deleteHandler = function (event) {
        var modal = $(this);
        var button = $(event.relatedTarget);

        //! set cooperation id globally
        cooperationId = button.data('cooperation-id');

        // set modal title
        modal.find("[data-content=cooperation-type]")
            .text(button.data('cooperation-type'))

        // set partner name
        modal.find("[data-content=cooperation-partner]")
            .text(button.data('cooperation-partner'));

        // set remove contract handler
        modal.find("[data-action=contract-delete]")
            .off("click", makeNotifications)
            .on("click", makeNotifications);
    };

    function makeNotifications() {
        var cooperationName;
        var studentId;
        var institutionId;
        var employerId;

        getCatalogItem(COOPERATIONS_CATALOG, cooperationId)
            .then(function(coooperationData) {
                var deferreds;

                cooperationName = coooperationData[1];
                studentId = coooperationData[4];
                institutionId = coooperationData[5];
                employerId = coooperationData[6];

                deferrers = [
                    studentId ? getCatalogItem(STUDENTS_CATALOG, studentId) : null,
                    getCatalogItem(INSTITUTIONS_CATALOG, institutionId),
                    getCatalogItem(EMPLOYERS_CATALOG, employerId)
                ];

                return $.when.apply($, deferrers);
            }).then(function(
                studentData,
                institutionData,
                employerData
            ) {
                var studentName = studentData ? studentData[1] : null;
                var institutionName = institutionData[2];
                var employerName = employerData[1];

                var msg = "Договор " + cooperationName + 
                    " c " + ( userRole === USER_ROLE_EMPLOYER ? institutionName : employerName) +
                      (studentName ? ` и студентом ${studentName}` : "") +
                    " удален";

                console.log(msg);

                var ids = {
                    cooperation: cooperationId,
                    user: currentUserFull.id,
                    student: studentId,
                    institution: institutionId,
                    employer: employerId
                };

                console.log('ids', ids);

                return $.when(
                    // отмечаем прочитанными все уведомления, которые
                    // относятся к удаляемому договору
                    markNotificationsAsReaded(cooperationId),
                    // удаляем договор
                    removeContractFromCatalog(cooperationId),
                    // оповещаем пользователей об удалении договора
                    notifyUsers(ids, msg)
                );
            })
            .then(reload)
            .catch(logError);
    }

    $("body")
        .off("show.bs.modal", "#delete-modal", deleteHandler)
        .on("show.bs.modal", "#delete-modal", deleteHandler);

    /**
     * Получение роли текущего пользователя
     *
     * @param {Object} rolesObj Хеш вида {"id роли": "роль"} из window.currentUserFull
     * @return {string} Роль текущего пользователя
     */
    function getUserRole(rolesObj) {
        var roles = Object.keys(rolesObj).map(key => rolesObj[key]);

        for (var i = 0; i < roles.length; i++ ) {
            if (USER_ROLES.indexOf(roles[i]) !== -1) {
                return roles[i];
            }
        }

        return USER_ROLE_UNKNOWN;
    }

    /**
     * Отправить уведомления о взаимодействии всем,
     * кроме инициатора взаимодействия
     */
    function notifyUsers(ids, msg) {
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
            text: msg || "",
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
     * Отметить уведомления как прочитанные
     */
    function markNotificationsAsReaded(cooperationId) {
        return getUnreadNotifications(cooperationId)
            .then(function (notifications) {
                var notificationIds = notifications.map(function (item) {
                    return item[0];
                });
                console.log("notifications:", notifications);
                return notificationIds;
            })
            .then(function (ids) {
                var deferreds;

                if (ids.length > 0) {
                    deferreds = ids.map(function (id) {
                        updateNotification(id, {
                            reading_marker: true,
                        });
                    });

                    return $.when.apply($, deferreds);
                }

                // return resolved promise
                return $.Deferred(function () {
                    this.resolve();
                });
            })
            .catch(logError);
    }

    /**
     * Получить непрочитанные уведомления
     */
    function getUnreadNotifications(cooperationId) {
        var data = {
            id_cooperation: cooperationId,
            reading_marker: false,
        };

        return getCatalogData(NOTIFICATIONS_CATALOG, data)
            .then(function (response) {
                var unreadNotifications = response.result.data;
                return unreadNotifications;
            });
    }

    /**
     * Обновить уведомление
     */
    function updateNotification(id, data) {
        return updateFieldsInCatalog(id, NOTIFICATIONS_CATALOG, data).catch(logError);
    }

    /**
     * Обновляем поля в каталоге
     * @param id
     * @returns {*}
     */
    function updateFieldsInCatalog(id, catalogName, data) {
        var url =
            "//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/updateFields?" +
            "code=" +
            catalogName.toUpperCase() +
            "&" +
            "id=" +
            id +
            "&" +
            "unique_request_identifier=" +
            _.uniqueId("PC_") +
            "&" +
            "version=1.2";

        var options = {
            url: url,
            dataType: "json",
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify(data),
        };

        return $.ajax(options);
    }

    /**
     * Перезагрузка страницы
     */
    function reload() {
        document.location.reload(true);
    }

    /**
     * Логируем ошибку
     */
    function logError(err) {
        console.error(err);
    }
})();
