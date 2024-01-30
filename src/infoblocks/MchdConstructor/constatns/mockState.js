import { formatSnils } from "../utils";

import { LegalEntityPrincipalType, PrincipalType } from "./constants";

const snils = formatSnils("52013557838");
const inn = "1111111111";
const innPerson = "111111111122";
const kpp = "222222222";
const ogrn = "3333333333333";
const ogrnip = "333333333333344";
const date = "10.10.1984";
const firstName = "Firstname";
const lastName = "Lastname";
const middleName = "Middlename";
const companyName = "Company Name";
const region = "7800000000000";
const representativeId = "495ff8c0-6f2a-11ee-bd29-e5e06384a8a9";
// const documentType = "21";
const seriesAndNumber = "12345";
const authorityDocument = "abc";
const authorityCodeDocument = "123";

export const mockState = {
    /**************************
     * Сведения о доверенности
     **************************/
    id: "",
    fio: "",
    number: "",

    extensionNumber: "123",
    created: date,
    validity: date,

    // Тип доверителя
    type: PrincipalType.LegalEntityPrincipal,

    /************************
     * Сведения о доверителе
     ************************/
    /**
     * Тип доверителя - Юридическое лицо
     */
    legalEntityPrincipal: {
        id: "",

        // Лицо, действующее без доверенности
        type: LegalEntityPrincipalType.LegalEntityPerson,

        companyName,
        inn,
        ogrn,
        kpp,
        region,

        // Лицо, действующее без доверенности - Юридическое лицо
        legalEntityPerson: {
            companyName,
            inn,
            ogrn,
            kpp,
            region,

            // Сведение о руководителе организации
            firstName,
            middleName,
            lastName,
            snils,
            birthday: date,
            innEIOUK: "",
        },

        // Лицо, действующее без доверенности - Физическое лицо
        person: {
            firstName,
            middleName,
            lastName,
            snils,
            birthday: date,
            inn: innPerson,
        },
    },

    /**
     * Тип доверителя - Физическое лицо
     */
    individualEntrepreneurPrincipal: {
        companyName,
        ogrn: ogrnip,

        // Сведения о подписанте
        id: "",
        firstName,
        middleName,
        lastName,
        snils,
        birthday: date,
        inn: innPerson,
    },

    /***************************
     * Сведения о представителе
     ***************************/
    representative: {
        id: representativeId,

        firstName,
        middleName,
        lastName,

        birthday: date,

        snils,
        inn: innPerson,

        documentType: "",
        seriesAndNumber,
        authorityDocument,
        authorityCodeDocument,

        created: date,
        validity: date,
    },
};
