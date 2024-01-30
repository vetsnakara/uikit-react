export const backToFrontMap = {
    /**************************
     * Сведения о доверенности
     **************************/
    id: "id",
    fio: "fio",
    number: "number",

    extensionNumber: "innerNumber",
    created: "attorneyDateBegin",
    validity: "attorneyDateEnd",

    // Тип доверителя
    type: "principalType",

    /************************
     * Сведения о доверителе
     ************************/
    /**
     * Тип доверителя - Юридическое лицо
     */
    "legalEntityPrincipal.id": "principalCompanyId",

    "legalEntityPrincipal.companyName": "principalCompanyName",
    "legalEntityPrincipal.inn": "principalCompanyInn",
    "legalEntityPrincipal.ogrn": "principalCompanyOgrn",
    "legalEntityPrincipal.kpp": "principalCompanyKpp",
    "legalEntityPrincipal.region": "principalCompanyRegion",

    // Лицо, действующее без доверенности
    "legalEntityPrincipal.type": "noAttorneyType",

    // Лицо, действующее без доверенности - Юридическое лицо
    "legalEntityPrincipal.legalEntityPerson.companyName": "noAttorneyCompanyName",
    "legalEntityPrincipal.legalEntityPerson.inn": "noAttorneyCompanyInn",
    "legalEntityPrincipal.legalEntityPerson.ogrn": "noAttorneyCompanyOgrn",
    "legalEntityPrincipal.legalEntityPerson.kpp": "noAttorneyCompanyKpp",
    "legalEntityPrincipal.legalEntityPerson.region": "noAttorneyCompanyRegion",

    // Сведение о руководителе организации
    "legalEntityPrincipal.legalEntityPerson.firstName": "noAttorneyCompanyDirectorFirstName",
    "legalEntityPrincipal.legalEntityPerson.middleName": "noAttorneyCompanyDirectorMiddleName",
    "legalEntityPrincipal.legalEntityPerson.lastName": "noAttorneyCompanyDirectorLastName",
    "legalEntityPrincipal.legalEntityPerson.snils": "noAttorneyCompanyDirectorSnils",
    "legalEntityPrincipal.legalEntityPerson.birthday": "noAttorneyCompanyDirectorBirthDate",
    "legalEntityPrincipal.legalEntityPerson.innEIOUK": "noAttorneyCompanyDirectorInn",

    // Лицо, действующее без доверенности - Физическое лицо
    "legalEntityPrincipal.person.firstName": "noAttorneyPersonFirstName",
    "legalEntityPrincipal.person.middleName": "noAttorneyPersonMiddleName",
    "legalEntityPrincipal.person.lastName": "noAttorneyPersonLastName",
    "legalEntityPrincipal.person.snils": "noAttorneyPersonSnils",
    "legalEntityPrincipal.person.birthday": "noAttorneyPersonBirthDate",
    "legalEntityPrincipal.person.inn": "noAttorneyPersonInn",

    /**
     * Тип доверителя - Физическое лицо
     */
    "individualEntrepreneurPrincipal.companyName": "principalPersonName",
    "individualEntrepreneurPrincipal.ogrn": "principalPersonOgrnip",

    // Сведения о подписанте
    "individualEntrepreneurPrincipal.firstName": "signatoryFirstName",
    "individualEntrepreneurPrincipal.middleName": "signatoryMiddleName",
    "individualEntrepreneurPrincipal.lastName": "signatoryLastName",
    "individualEntrepreneurPrincipal.snils": "signatorySnils",
    "individualEntrepreneurPrincipal.birthday": "signatoryBirthDate",
    "individualEntrepreneurPrincipal.inn": "signatoryInn",
    "individualEntrepreneurPrincipal.id": "signatoryId",

    /***************************
     * Сведения о представителе
     ***************************/
    "representative.id": "representativeId",

    "representative.firstName": "representativeFirstName",
    "representative.middleName": "representativeMiddleName",
    "representative.lastName": "representativeLastName",

    "representative.birthday": "representativeBirthDate",

    "representative.snils": "representativeSnils",
    "representative.inn": "representativeInn",

    "representative.documentType": "representativeDocument",
    "representative.seriesAndNumber": "representativeDocumentNumber",
    "representative.authorityDocument": "representativeDocumentOrganizationName",
    "representative.authorityCodeDocument": "representativeDocumentOrganizationCode",

    "representative.created": "representativeDocumentDateBegin",
    "representative.validity": "representativeDocumentDateEnd",
};
