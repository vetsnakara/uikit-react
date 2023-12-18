/**
 * Функции карты взаимодействии
 **/

(function () {
    // имена каталогов
    var ACTIVITY_AREA_CATALOG = "ACTIVITY_AREA";
    var DEMANDED_PROFESSIONS_CATALOG = "DEMANDED_PROFESSIONS";
    var STUDENT_CATALOG = "STUDENT";
    var PARTNERSHIP_CATALOG = "PARTNERSHIP";
    var NOTIFICATIONS_CATALOG = "NOTIFICATIONS";
    var COOPERATIONS_CATALOG = "COOPERATION";

    // роли пользователя
    var USER_ROLE_CANDIDATE = "Кандидат";
    var USER_ROLE_EMPLOYER = "Работодатель";
    var USER_ROLE_INSTITUTION = "Учебное заведение";
    var USER_ROLE_UNKNOWN = "USER_ROLE_UNKNOWN";

    var REQUEST_SUCCESS = "SUCCESS";

    var isChangeStudentInit = false;
    var COOPERATION_SOURCE = "_im_cooperation";
    var CONTRACT_SOURCE = "_im_contracts";
    var DS_HOST = "";
    var fileID;
    var fileExist = false;
    var strudensList = {};
    var cooperationDS = {
        dataSourceId: "",
        dataVersion: "",
        sortId: "",
        id: "",
    };
    var contractDS = {
        dataSourceId: "",
        dataVersion: "",
        sortId: "",
        id: "",
    };

    var url = window.location.href;

    var userId, userRole;

    var studentId, employerId, institutionId;

    var initFlag = false;

    // проверка авторизации
    if (!currentUserFull) {
        console.error("currentUserFull is not defined");
        return;
    }

    // данные пользователя
    userId = currentUserFull.id;
    userRole = (function () {
        var roles = Object.values((currentUserFull && currentUserFull.roles) || {});
        return roles.length ? roles[0] : USER_ROLE_UNKNOWN;
    })();

    console.log("userId:", userId);
    console.log("userRole:", userRole);

    // ============== INITIALIZATION ===================

    $(document).on("htmltextjs:rended", function (event, id) {
        var cooperationId = window.cooperation_id || url.slice(url.indexOf("=") + 1);
        var ib = $("#" + id);
        var form = ib.hasClass("interact-form") ? ib : null;
        var fileIDWrapper = $(".file-preview[data-file]");
        var fileIdWrapperIB;

        // Prevent init
        if(!form) return false;

        var saveBtn = $("[ref=save-data]", form);
        var enableBtn = function () {
            saveBtn.removeAttr("disabled");
        };

        $("[name=partner-type-select]").on("change", enableBtn);
        $(".text__control, .select__control", form).on("change", enableBtn);

        if (!initFlag) {
            initFlag = true;

            $(".select__control").select2();

            console.log("cooperatinId", cooperationId);
            if (!cooperationId) {
                console.error("cooperationId is not defined");
            }

            // получаем id участников взаимодействия
            setPartnersIds(cooperationId).then(function () {
                console.log("studentId:", studentId);
                console.log("institutionId", institutionId);
                console.log("employerId", employerId);
            });

            // отмечаем уведомления прочитанными
            markNotificationsAsReaded(userId, cooperationId).then(function () {
                console.log("Mark notifications readed: done");
            });
        }

        // заполнение формы
        if (form) {
            getCatalogData("COOPERATION", { id: [window.cooperation_id] }).done(function (response) {
                var data = response.result.data && response.result.data.length && response.result.data[0];

                var instituteRating = data[14];
                var employerRating = data[13];
                var partnershipType = data[29];

                if (data && data.length) {
                    $(".select__control[ref=institute_rating]", form).val(instituteRating);
                    $(".select__control[ref=employer_rating]", form).val(employerRating);
                    $(".select__control[name=partner-type-select]")
                        .val(partnershipType)
                        .trigger("change");

                }
            });
        }

        // получение данных о прикрепленном договоре
        if (!fileExist && fileIDWrapper.length) {
            fileIdWrapperIB = fileIDWrapper.closest("[data-uid]");
            fileID = fileIDWrapper.data("file");

            getFileEnum(fileID)
                .then(function (response) {
                    var link;
                    var name;
                    var atachWrapper;
                    if (response && response.attachs && response.attachs.length) {
                        fileExist = true;
                        if (response.attachs.length > 1) {
                            atachWrapper = $(".file-preview__container").css("display", "auto");
                            atachWrapper.empty();
                            response.attachs.forEach(function (item) {
                                if (item.extId === fileID) {
                                    link = "/api/archive/download/" + item.file;
                                    name = item.fileName;
                                } else {
                                    atachWrapper.append(
                                        "<a class='file-preview file-preview_vertical link' target='_blank' href='" +
                                            "/api/archive/download/" +
                                            item.file +
                                            "'>" +
                                            item.fileName +
                                            "</a>"
                                    );
                                }
                            });
                            atachWrapper.css("display", "flex");
                        } else {
                            link = "/api/archive/download/" + response.attachs[0].file;
                            name = response.attachs[0].fileName;
                        }
                    } else {
                        console.warn("Карта взаимодействия без договора");
                        link = fileID;
                        name = "Договор отсутствует";
                    }
                    fileIDWrapper.text(name);
                    $("a[ref=file-download]", fileIdWrapperIB).attr("href", link);
                    $("a[ref=file-download]", fileIdWrapperIB).attr("target", "_blank");
                })
                .catch(logError);
        }

        // обработчик кнопки сохранения данных формы
        if (saveBtn.length) {
            $(".upload__control[type=file]")
                .off("change")
                .on("change", function () {
                    var control = $(this);
                    if (control.get(0).files.length) {
                        control.closest("label.upload").find(".upload__file").text(control.get(0).files[0].name);
                    }
                    enableBtn();
                });

            saveBtn.off("click").on("click", initSaveData);
        }
    });

    // ============== FUNCTIONS ==============

    /**
     * Получить и установить идентификаторы
     * студента, работодателя и уч. заведения
     */
    function setPartnersIds(cooperationId) {
        var data = { id: cooperationId };

        return getCatalogData(COOPERATIONS_CATALOG, data)
            .then(validateResponse)
            .then(function (response) {
                var data = response.result.data,
                    code = response.result.code,
                    cooperation,
                    student,
                    institution,
                    employer;

                cooperation = data[0];

                student = cooperation[4];
                institution = cooperation[5];
                employer = cooperation[6];

                studentId = student && student[0];
                institutionId = institution && institution[0];
                employerId = employer && employer[0];
            })
            .catch(logError);
    }

    /**
     * Отправить уведомления о взаимодействии всем,
     * кроме инициатора взаимодействия
     */
    function notifyUsers() {
        var recepientIds = [studentId, employerId, institutionId].filter(function (id) {
                // 1. студента может не быть (studentId = undefined)
                // 2. не отправляем уведомление ицициатору
                return id && id !== userId;
            }),
            data = {
                id_cooperation: window.cooperation_id,
                date: Date.now(),
                reading_marker: false,
                text: "",
                id_student: studentId,
                id_institution: institutionId,
                id_employer: employerId,
            },
            deferreds = recepientIds.map(function (id) {
                return sendNotification(id, data);
            });

        return $.when.apply($, deferreds);
    }

    /**
     * Получить непрочитанные уведомления
     */
    function getUnreadNotifications(userId, cooperationId) {
        var data = {
            id_recipient: userId,
            id_cooperation: cooperationId,
            reading_marker: false,
        };

        return getCatalogData(NOTIFICATIONS_CATALOG, data)
            .then(validateResponse)
            .then(function (response) {
                var unreadNotifications = response.result.data;
                return unreadNotifications;
            });
    }

    /**
     * Отметить уведомления как прочитанные
     */
    function markNotificationsAsReaded(userId, cooperationId) {
        return getUnreadNotifications(userId, cooperationId)
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
     * Получаем данные для обновления каталогов
     */
    new bft_JoinSource({
        sources: [COOPERATION_SOURCE, CONTRACT_SOURCE],
        initHandler: function (response) {
            var cooperationData = response[COOPERATION_SOURCE];
            var contractData = response[CONTRACT_SOURCE];

            var url = cooperationData.url.split("/getData/");
            DS_HOST = url[0];
            url = url[1].split("/");
            cooperationDS.dataSourceId = url[0];
            cooperationDS.dataVersion = url[1];

            url = contractData.url.split("/getData/");
            url = url[1].split("/");
            contractDS.dataSourceId = url[0];
            contractDS.dataVersion = url[1];
        },
        handler: null,
    });

    /**
     * Записываем факт просмотра страницы
     */
    function coopeationPageViewed() {
        getCatalogData("COOPERATION", { id: [window.cooperation_id] }).done(function (response) {
            var data = response.result.data && response.result.data.length && response.result.data[0];

            if (data && data.length && data[15] == "Новый") {
                var institutionAuth = Object.values(currentUserFull.roles)[0] == "Учебное заведение";
                var institutionInit = Boolean(data[2] && data[2] /* request_code */[8] /* id_institution */);
                var employerAuth = Object.values(currentUserFull.roles)[0] == "Работодатель";
                var employerInit = Boolean(data[2] && data[2] /* request_code */[9] /* id_employer */);

                if ((institutionInit && institutionAuth) || (employerInit && employerAuth)) {
                    cooperationDS.id = window.cooperation_id;
                    cooperationDS.sortId = window.cooperation_id;

                    setFields(DS_HOST, cooperationDS, {
                        view_changes: true,
                    });
                }
            }
        });
    }

    /**
     * Создаем партнерство
     */
    function createPartnership(data) {
        var params = [
            data.id_contract,
            data.contract_date,
            data.validity,
            data.id_employer,
            data.id_institution,
            data.partnership_status,
            data.partnership_type,
        ];
        var url =
            "//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/create?" +
            "code=" +
            PARTNERSHIP_CATALOG +
            "&" +
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

    /**
      Подписываем договор
    **/
    function approveContract() {
        getCatalogData("COOPERATION", { id: [window.cooperation_id] }).done(function (response) {
            var data = response.result.data && response.result.data.length && response.result.data[0];

            if (data && data.length) {
                // Если стоят подписи всех участников
                var type = data[1]; //cooperation_type;
                var eSign = data[19]; //employer_signature
                var iSign = data[18]; //institution_signature
                var sSign = !data[4] /* not id_student */ || !data[28] /* not required sign */ || data[20]; //student_signature

                var partnershipDone = type == "Партнерское соглашение" && eSign && iSign;
                var internshipDone = type != "Партнерское соглашение" && eSign && iSign && sSign;
                var partnershipType = $(".select__control[name=partner-type-select]").val();
                var currentTime = Date.now();

                if (partnershipDone || internshipDone) {
                    $.when(
                        partnershipDone &&
                            createPartnership({
                                id_contract: data[3][0],
                                contract_date: currentTime,
                                validity: data[3][13],
                                id_employer: data[6][0],
                                id_institution: data[5][0],
                                partnership_status: "Активный",
                                partnership_type: partnershipType,
                            }),
                        setFields(DS_HOST, cooperationDS, {
                            contract_concluded: currentTime,
                            status: "Заключен",
                        }),
                        setFields(DS_HOST, contractDS, {
                            contract_date: currentTime,
                        })
                    );
                } else {
                    setFields(DS_HOST, cooperationDS, {
                        status: "На подписании",
                    });
                }
            } else {
                reload();
            }
        });
    }

    /**
     * Обновялем пользователя в договоре и карте взаимодействия
     */
    function initStudentChangeForm() {
        var btn = $("#change_student .modal__footer .button");

        btn.on("click", function () {
            var wrapper = $("#change_student");
            var student_id = $("select", wrapper).val();
            var students = null;

            if (_.isArray(student_id)) {
                students = _.range(1, student_id.length).map(function (index) {
                    return strudensList[student_id[index]];
                });
                student_id = student_id[0];
            }

            var data = {
                id_student: student_id,
                students: students,
                required_student_signature: _.isArray(students)
                    ? false
                    : $("[name=required_sign]", wrapper).is(":checked"),
            };

            contractDS.id = window.contract_id;
            contractDS.sortId = window.contract_id;

            cooperationDS.id = window.cooperation_id;
            cooperationDS.sortId = window.cooperation_id;

            $.when(setFields(DS_HOST, contractDS, data), setFields(DS_HOST, cooperationDS, data))
                .then(notifyUsers)
                .then(reload)
                .catch(logError);
        });
    }

    /**
     * Оброботка кнопки сохранения данных
     */
    function initSaveData() {
        var promises = [];

        var fileInput = $(".upload__control[name=contract_file]");
        var selectInputI = $(".select__control[ref=institute_rating]").val();
        var selectInputE = $(".select__control[ref=employer_rating]").val();
        var employerReview = $(".text__control[name=description]").val();
        var employerComment = $(".text__control[name=employer_comment]").val();
        var institutionComment = $(".text__control[name=education_comment]").val();
        var partnershipType = $(".select__control[name=partner-type-select]").val()

        console.log("--- form data ---");
        console.log("fileInput:", fileInput);
        console.log("selectInputE:", selectInputE);
        console.log("selectInputI:", selectInputI);
        console.log("employerReview:", employerReview);
        console.log("employerComment:", employerComment);
        console.log("institutionCommen:", institutionComment);
        console.log("partnershipType:", partnershipType);

        var isEmployer = userRole === USER_ROLE_EMPLOYER;
        var isInstitution = userRole === USER_ROLE_INSTITUTION;

        cooperationDS.id = window.cooperation_id;
        cooperationDS.sortId = window.cooperation_id;

        console.log(cooperationDS);
        console.log(cooperationDS);

        // присоединить файл
        if (fileExist && fileInput.get(0).files.length) {
            promises.push(atachFile(fileInput.get(0).files, fileID));
        }

        // добавить отзыв работодателя
        if (isEmployer && employerReview) {
            promises.push(
                setFields(DS_HOST, cooperationDS, {
                    employer_review: employerReview,
                })
            );
        }

        // добавить комментарий работодателя
        if (isEmployer && employerComment) {
            promises.push(
                setFields(DS_HOST, cooperationDS, {
                    comment_employer: employerComment,
                })
            );
        }

        // добавить комметарий образовательной организации
        if (isInstitution && institutionComment) {
            promises.push(
                setFields(DS_HOST, cooperationDS, {
                    comment_educational: institutionComment,
                })
            );
        }

        // выбрать тип партнёрства
        if (isInstitution && partnershipType) {
            promises.push(
                setFields(DS_HOST, cooperationDS, {
                    partnership_type: partnershipType,
                })
            );
        }

        // добавить оценку учебного заведения
        if (selectInputI) {
            promises.push(
                setFields(DS_HOST, cooperationDS, {
                    institution_rating: selectInputI,
                    institution_rating_setting: Date.now(),
                })
            );
        }

        // добавить оценку работодателя
        if (selectInputE) {
            promises.push(
                setFields(DS_HOST, cooperationDS, {
                    employer_rating: selectInputE,
                    employer_rating_setting: Date.now(),
                })
            );
        }

        if (promises.length) {
            $.when.apply($, promises).then(notifyUsers).then(reload).catch(logError);
        }
    }

    /**
     * Загрузка атача к документу
     * @param files
     * @param id
     * @returns {jQuery}
     */
    function atachFile(files, id) {
        var data = new FormData();
        data.append("typeCode", "studDoc");
        data.append("attachExtId", createUUID1());
        data.append("file", files[0]);
        data.append("systemCode", "intern");
        data.append("extId", id);

        return $.ajax({
            url: "/api/archive/storeAttachment",
            data: data,
            contentType: false,
            processData: false,
            type: "POST",
        }).then(() => console.log("FILE ATTACHED"))
        .catch(err => console.err(err));
    }

    /**
     * Инициаилизация подписания договора участником взаимодействия
     */
    function initApproveContract(contractData, cooperationData) {
        var btn = $("#contract_appruve_info .modal__footer .button");

        btn.on("click", function () {
            contractDS.id = window.contract_id;
            contractDS.sortId = window.contract_id;

            cooperationDS.id = window.cooperation_id;
            cooperationDS.sortId = window.cooperation_id;

            $.when(setFields(DS_HOST, contractDS, contractData), setFields(DS_HOST, cooperationDS, cooperationData))
                .then(approveContract)
                .then(notifyUsers)
                .then(reload)
                .catch(logError);
        });
    }

    /**
     * Инициализация подписания работодателем
     */
    function initApproveContractEmployer() {
        var contractData = { employer_signature: true };
        var cooperationData = { employer_signature: Date.now() };
        initApproveContract(contractData, cooperationData);
    }

    /**
     * Инициаилизация подписания школой
     */
    function initApproveContractSchool() {
        var contractData = { institution_signature: true };
        var cooperationData = { institution_signature: Date.now() };
        initApproveContract(contractData, cooperationData);
    }

    /**
     * Инициализация подписания студентом
     */
    function initApproveContractStudent() {
        var contractData = { student_signature: true };
        var cooperationData = { student_signature: Date.now() };
        initApproveContract(contractData, cooperationData);
    }

    /**
     * Получает область деятельности по ее коду и вставляет название по селектору
     * @param code
     * @param label
     */
    function getActionSpace(code, label) {
        var filter = { code: [code] };

        return getCatalogData(ACTIVITY_AREA_CATALOG, filter)
            .then(function (response) {
                $(label).text(_.last(response.result.data[0]));
            })
            .catch(logError);
    }

    /**
     * Получает профессию по ее коду, вставляет название по селектору label
     * @param code
     * @param label
     */
    function getProffesion(code, label) {
        var filter = { code: [code] };

        return getCatalogData(DEMANDED_PROFESSIONS_CATALOG, filter)
            .then(function (response) {
                $(label).text(response.result.data[0][3]);
            })
            .catch(logError);
    }

    /**
     * Получает список студентов высшей школы
     * @param id
     */
    function initStudentSelect(id, sudent_id, sign_required, students) {
        var select = $("#sSchoolStudents");
        var addStud = students.split(",");
        var filter = {
            id_institution: id || "1111111111111111111111111111111",
        };

        $("[name=required_sign]", "#change_student").prop("checked", sign_required);

        getCatalogData(STUDENT_CATALOG, filter)
            .done(function (response) {
                var options = [];
                var startVal = [sudent_id];
                (response.result.data || []).forEach(function (row) {
                    strudensList[row[0]] = row[1];
                    if (addStud.indexOf(row[1]) > -1) {
                        startVal.push(row[0]);
                    }
                    options.push({ id: row[0], text: row[1] });
                });

                select
                    .select2({
                        data: options,
                    })
                    .val(startVal)
                    .trigger("change");

                select.on("change", function () {
                    var studSingnCB = $("input[name=required_sign]");
                    var val = select.val();
                    if (_.isArray(val) && val.length > 1) {
                        studSingnCB.removeAttr("checked");
                        studSingnCB.attr("disabled", "disabled");
                    } else {
                        studSingnCB.removeAttr("disabled");
                    }
                });
            })
            .catch(logError);
    }

    // ========= UTILITY FUNCTIONS ==========

    /**
     * Перезагрузка страницы
     */
    function reload() {
        window.location.reload(true);
    }

    /**
     * Логирование ошибки
     */
    function logError(err) {
        console.error(err);
    }

    /**
     * Проверка ответа сервера при получении данных
     * на успешный статус
     */
    function validateResponse(response) {
        var code = response.result.code;

        if (code !== REQUEST_SUCCESS) {
            throw new Error("Bad request code:", code);
        }

        return response;
    }

    // ========= EXPORT FUNCTIONS ==========

    window.coopeationPageViewed = coopeationPageViewed;
    window.getActionSpace = getActionSpace;
    window.getProffesion = getProffesion;
    window.initStudentSelect = initStudentSelect;
    window.initStudentChangeForm = initStudentChangeForm;
    window.initApproveContractEmployer = initApproveContractEmployer;
    window.initApproveContractSchool = initApproveContractSchool;
    window.initApproveContractStudent = initApproveContractStudent;
})();
