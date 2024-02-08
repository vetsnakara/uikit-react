export const DATE_FORMAT: "DD.MM.YYYY";
export namespace Status {
    let Draft: string;
    let Signed: string;
    let Revoked: string;
}
export namespace UserRole {
    let Owner: string;
    let Manager: string;
}
export namespace Action {
    let SIGN: string;
    let DELETE: string;
    let DOWNLOAD: string;
    let REVOKE: string;
    let COPY: string;
}
export namespace AppAction {
    export let SET_STATUS: string;
    let SIGN_1: string;
    export { SIGN_1 as SIGN };
    let DELETE_1: string;
    export { DELETE_1 as DELETE };
    let REVOKE_1: string;
    export { REVOKE_1 as REVOKE };
}
export function getStatusAttrs({ status, userRole }: {
    status: any;
    userRole: any;
}): {
    actions: any[];
    dropdownItems: any[];
    name: string;
    statusType: string;
};
export namespace Notification {
    let Success: {
        [x: string]: {
            title: string;
        };
        [x: number]: {
            title: string;
        };
    };
    let Failure: {
        [x: string]: {
            title: string;
        };
        [x: number]: {
            title: string;
        };
    };
}
export namespace PrincipalType {
    let LegalEntityPrincipal: string;
    let IndividualEntrepreneurPrincipal: string;
}
/**
 * Наименование доверителя
 */
export const PrincipalName: {
    [x: string]: string;
};
export namespace LegalEntityPrincipalType {
    let LegalEntityPerson: string;
    let Person: string;
}
/**
 * Наименование лицa, действующего без доверенности
 */
export const LegalEntityPrincipalName: {
    [x: string]: string;
};
export namespace DocKind {
    let RussianCitizenPassport: string;
    let MilitaryTicket: string;
    let ForeignCitizenPassport: string;
    let InternationalPassportOfCitizenOfRussianFederation: string;
}
