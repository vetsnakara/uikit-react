export namespace mockState {
    export let id: string;
    export let fio: string;
    export let number: string;
    export let extensionNumber: string;
    export { date as created };
    export { date as validity };
    export let type: string;
    export namespace legalEntityPrincipal {
        let id_1: string;
        export { id_1 as id };
        let type_1: string;
        export { type_1 as type };
        export { companyName };
        export { inn };
        export { ogrn };
        export { kpp };
        export { region };
        export namespace legalEntityPerson {
            export { companyName };
            export { inn };
            export { ogrn };
            export { kpp };
            export { region };
            export { firstName };
            export { middleName };
            export { lastName };
            export { snils };
            export { date as birthday };
            export let innEIOUK: string;
        }
        export namespace person {
            export { firstName };
            export { middleName };
            export { lastName };
            export { snils };
            export { date as birthday };
            export { innPerson as inn };
        }
    }
    export namespace individualEntrepreneurPrincipal {
        export { companyName };
        export { ogrnip as ogrn };
        let id_2: string;
        export { id_2 as id };
        export { firstName };
        export { middleName };
        export { lastName };
        export { snils };
        export { date as birthday };
        export { innPerson as inn };
    }
    export namespace representative {
        export { representativeId as id };
        export { firstName };
        export { middleName };
        export { lastName };
        export { date as birthday };
        export { snils };
        export { innPerson as inn };
        export { documentType };
        export { seriesAndNumber };
        export { authorityDocument };
        export { authorityCodeDocument };
        export { date as created };
        export { date as validity };
    }
}
declare const date: "10.10.1984";
declare const companyName: "Company Name";
declare const inn: "1111111111";
declare const ogrn: "3333333333333";
declare const kpp: "222222222";
declare const region: "7800000000000";
declare const firstName: "Firstname";
declare const middleName: "Middlename";
declare const lastName: "Lastname";
declare const snils: any;
declare const innPerson: "111111111122";
declare const ogrnip: "333333333333344";
declare const representativeId: "495ff8c0-6f2a-11ee-bd29-e5e06384a8a9";
declare const documentType: "21";
declare const seriesAndNumber: "12345";
declare const authorityDocument: "abc";
declare const authorityCodeDocument: "123";
export {};
