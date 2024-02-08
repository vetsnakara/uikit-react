export function getFieldConfig(name: any): any;
export const Regexp: {
    [x: string]: string;
};
export const attorneyDateBeginBaseSchema: any;
export const attorneyDateEndBaseSchema: any;
export namespace shape {
    export namespace legalEntityPrincipal {
        export { shapeLegalEntityPerson as legalEntityPerson };
        export { shapePerson as person };
        export let companyName: any;
        export let inn: any;
        export let kpp: any;
        export let ogrn: any;
        export let region: any;
        export let type: any;
    }
    export { shapeIndividualEntrepreneurPrincipal as individualEntrepreneurPrincipal };
    export { shapeRepresentative as representative };
    export let extensionNumber: any;
    export { attorneyDateBeginBaseSchema as created };
    export { attorneyDateEndBaseSchema as validity };
    let type_1: any;
    export { type_1 as type };
}
export const schema: any;
export function buildData({ type, legalEntityPrincipal, individualEntrepreneurPrincipal, ...rest }: any): any;
declare namespace shapeLegalEntityPerson {
    let companyName_1: any;
    export { companyName_1 as companyName };
    let inn_1: any;
    export { inn_1 as inn };
    let kpp_1: any;
    export { kpp_1 as kpp };
    let ogrn_1: any;
    export { ogrn_1 as ogrn };
    export let lastName: any;
    export let firstName: any;
    export let middleName: any;
    export let birthday: any;
    export let snils: any;
}
declare namespace shapePerson {
    let lastName_1: any;
    export { lastName_1 as lastName };
    let firstName_1: any;
    export { firstName_1 as firstName };
    let middleName_1: any;
    export { middleName_1 as middleName };
    let birthday_1: any;
    export { birthday_1 as birthday };
    let snils_1: any;
    export { snils_1 as snils };
    let inn_2: any;
    export { inn_2 as inn };
}
declare namespace shapeIndividualEntrepreneurPrincipal {
    let companyName_2: any;
    export { companyName_2 as companyName };
    let ogrn_2: any;
    export { ogrn_2 as ogrn };
    let lastName_2: any;
    export { lastName_2 as lastName };
    let firstName_2: any;
    export { firstName_2 as firstName };
    let middleName_2: any;
    export { middleName_2 as middleName };
    let birthday_2: any;
    export { birthday_2 as birthday };
    let snils_2: any;
    export { snils_2 as snils };
    let inn_3: any;
    export { inn_3 as inn };
}
declare namespace shapeRepresentative {
    export let id: any;
    let birthday_3: any;
    export { birthday_3 as birthday };
    let snils_3: any;
    export { snils_3 as snils };
    let inn_4: any;
    export { inn_4 as inn };
    export let documentType: any;
    export let created: any;
    export let authorityDocument: any;
    export let authorityCodeDocument: any;
    export let validity: any;
}
export {};
