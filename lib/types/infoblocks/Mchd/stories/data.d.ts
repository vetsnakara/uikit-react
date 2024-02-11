export function getData({ status, userRole, principalType, legalEntityPrincipalType, }?: {
    status?: string;
    userRole?: string;
    principalType?: string;
    legalEntityPrincipalType?: string;
}): {
    userRole: string;
    mchd: {
        id: any;
        fio: string;
        created: string;
        extensionNumber: string;
        number: string;
        validity: string;
        type: string;
        legalEntityPrincipal: {
            id: string;
            companyName: string;
            inn: string;
            ogrn: string;
            kpp: string;
            region: string;
            type: string;
            legalEntityPerson: {
                firstName: string;
                middleName: string;
                lastName: string;
                snils: string;
                birthday: string;
                inn: string;
                companyName: string;
                ogrn: string;
                kpp: string;
                region: string;
            };
            person: {
                firstName: string;
                middleName: string;
                lastName: string;
                snils: string;
                birthday: string;
                inn: string;
            };
        };
        individualEntrepreneurPrincipal: {
            firstName: string;
            middleName: string;
            lastName: string;
            snils: string;
            birthday: string;
            inn: string;
            id: any;
            companyName: string;
            ogrn: string;
        };
        representative: {
            firstName: string;
            middleName: string;
            lastName: string;
            snils: string;
            birthday: string;
            inn: string;
            id: string;
            documentType: string;
            seriesAndNumber: string;
            authorityDocument: string;
            authorityCodeDocument: string;
            validity: string;
            created: string;
        };
        status: string;
        actions: string[];
    };
    documentTypes: {
        code: string;
        shortName: string;
        template: string;
        comment: string;
        name: string;
    }[];
    regions: {
        key: string;
        text: string;
    }[];
};
