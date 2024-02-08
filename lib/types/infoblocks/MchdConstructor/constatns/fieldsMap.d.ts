export const backToFrontMap: {
    /**************************
     * Сведения о доверенности
     **************************/
    id: string;
    fio: string;
    number: string;
    extensionNumber: string;
    created: string;
    validity: string;
    type: string;
    /************************
     * Сведения о доверителе
     ************************/
    /**
     * Тип доверителя - Юридическое лицо
     */
    "legalEntityPrincipal.id": string;
    "legalEntityPrincipal.companyName": string;
    "legalEntityPrincipal.inn": string;
    "legalEntityPrincipal.ogrn": string;
    "legalEntityPrincipal.kpp": string;
    "legalEntityPrincipal.region": string;
    "legalEntityPrincipal.type": string;
    "legalEntityPrincipal.legalEntityPerson.companyName": string;
    "legalEntityPrincipal.legalEntityPerson.inn": string;
    "legalEntityPrincipal.legalEntityPerson.ogrn": string;
    "legalEntityPrincipal.legalEntityPerson.kpp": string;
    "legalEntityPrincipal.legalEntityPerson.region": string;
    "legalEntityPrincipal.legalEntityPerson.firstName": string;
    "legalEntityPrincipal.legalEntityPerson.middleName": string;
    "legalEntityPrincipal.legalEntityPerson.lastName": string;
    "legalEntityPrincipal.legalEntityPerson.snils": string;
    "legalEntityPrincipal.legalEntityPerson.birthday": string;
    "legalEntityPrincipal.legalEntityPerson.innEIOUK": string;
    "legalEntityPrincipal.person.firstName": string;
    "legalEntityPrincipal.person.middleName": string;
    "legalEntityPrincipal.person.lastName": string;
    "legalEntityPrincipal.person.snils": string;
    "legalEntityPrincipal.person.birthday": string;
    "legalEntityPrincipal.person.inn": string;
    /**
     * Тип доверителя - Физическое лицо
     */
    "individualEntrepreneurPrincipal.companyName": string;
    "individualEntrepreneurPrincipal.ogrn": string;
    "individualEntrepreneurPrincipal.firstName": string;
    "individualEntrepreneurPrincipal.middleName": string;
    "individualEntrepreneurPrincipal.lastName": string;
    "individualEntrepreneurPrincipal.snils": string;
    "individualEntrepreneurPrincipal.birthday": string;
    "individualEntrepreneurPrincipal.inn": string;
    "individualEntrepreneurPrincipal.id": string;
    /***************************
     * Сведения о представителе
     ***************************/
    "representative.id": string;
    "representative.firstName": string;
    "representative.middleName": string;
    "representative.lastName": string;
    "representative.birthday": string;
    "representative.snils": string;
    "representative.inn": string;
    "representative.documentType": string;
    "representative.seriesAndNumber": string;
    "representative.authorityDocument": string;
    "representative.authorityCodeDocument": string;
    "representative.created": string;
    "representative.validity": string;
};
