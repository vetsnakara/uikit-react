// todo: нужно работать изначально со вложенными полями, без маппинга

import { LegalEntityPrincipalType, PrincipalType } from "./constants";

export const mockState = {
    /**************************
     * Сведения о доверенности
     **************************/
    id: "123",
    fio: "Aaaaaa Bbbbbb Cccccc",
    number: "123",

    innerNumber: "123",
    attorneyDateBegin: "10.10.1984",
    attorneyDateEnd: "10.10.1984",

    // Тип доверителя
    principalType: PrincipalType.IndividualEntrepreneurPrincipal,

    /************************
     * Сведения о доверителе
     ************************/
    /**
     * Тип доверителя - Юридическое лицо
     */
    // "legalEntityPrincipal.id": "principalCompanyId",

    principalCompanyName: "Company name",
    principalCompanyInn: "1111111111",
    principalCompanyOgrn: "222222222",
    principalCompanyKpp: "333333333",
    principalCompanyRegion: "7800000000000",

    // Лицо, действующее без доверенности
    noAttorneyType: LegalEntityPrincipalType.Person,

    // Лицо, действующее без доверенности - Юридическое лицо
    noAttorneyCompanyName: "Company name",
    noAttorneyCompanyInn: "11111111",
    noAttorneyCompanyOgrn: "222222222",
    noAttorneyCompanyKpp: "333333333",
    noAttorneyCompanyRegion: "7800000000000",

    // Сведение о руководителе организации
    noAttorneyCompanyDirectorFirstName: "Firstname",
    noAttorneyCompanyDirectorMiddleName: "Middlename",
    noAttorneyCompanyDirectorLastName: "Lastname",
    noAttorneyCompanyDirectorSnils: "23423425345",
    noAttorneyCompanyDirectorBirthDate: "10.10.1984",

    // Лицо, действующее без доверенности - Физическое лицо
    noAttorneyPersonFirstName: "Firstname",
    noAttorneyPersonMiddleName: "MiddleName",
    noAttorneyPersonLastName: "Lastname",
    noAttorneyPersonSnils: "3453453453",
    noAttorneyPersonBirthDate: "10.10.1984",
    noAttorneyPersonInn: "34535345345",

    /**
     * Тип доверителя - Физическое лицо
     */
    principalPersonName: "Compnay name",
    principalPersonOgrnip: "3345345345",

    // Сведения о подписанте
    signatoryFirstName: "Firstname",
    signatoryMiddleName: "Middlename",
    signatoryLastName: "Lastname",
    signatorySnils: "34345345",
    signatoryBirthDate: "10.10.1984",
    signatoryInn: "23234234234",
    //  "signatoryId",

    // /***************************
    //  * Сведения о представителе
    //  ***************************/
    representativeId: "98de3b20-6f28-11ee-bd29-e5e06384a8a9",

    // "representative.firstName": "representativeFirstName",
    // "representative.middleName": "representativeMiddleName",
    // "representative.lastName": "representativeLastName",

    representativeBirthDate: "10.10.1984",

    representativeSnils: "32423423345",
    representativeInn: "34234234234",

    representativeDocument: 21,
    representativeDocumentNumber: "345345345",
    representativeDocumentOrganizationName: "Docname",
    representativeDocumentOrganizationCode: "343423",

    representativeDocumentDateBegin: "10.10.1938",
    representativeDocumentDateEnd: "11.11.1985",
};
