import React from "react";

import { MchdConstructor } from "../MchdConstructor";

import { LegalEntityPrincipalType, PrincipalType, Status, UserRole } from "../constatns/constants";

import { Provider } from "../context";

import { getData } from "./data";
import { WithInfoblockLayout } from "./decorators";

// todo: remove SB paddings

export default {
    title: "infoblocks/MchdConstructor",
    decorators: [WithInfoblockLayout],
    argTypes: {
        status: {
            options: [Status.Draft, Status.Signed, Status.Revoked],
            control: { type: "radio" },
        },
        userRole: {
            options: [UserRole.Owner, UserRole.Manager],
            control: { type: "radio" },
        },
        principalType: {
            options: [PrincipalType.LegalEntityPrincipal, PrincipalType.IndividualEntrepreneurPrincipal],
            control: { type: "radio" },
        },
        legalEntityPrincipalType: {
            options: [LegalEntityPrincipalType.LegalEntityPerson, LegalEntityPrincipalType.Person],
            control: { type: "radio" },
        },
    },
};

// todo: SB for Sidebar and Main separately?

// change key to force update element tree
export const Default = (args) => (
    <React.Fragment key={JSON.stringify(args)}>
        <Provider data={getData(args)}>
            <MchdConstructor />
        </Provider>
    </React.Fragment>
);

Default.args = {
    status: Status.Draft,
    userRole: UserRole.Owner,
    principalType: PrincipalType.LegalEntityPrincipal,
    legalEntityPrincipalType: LegalEntityPrincipalType.LegalEntityPerson,
};

// Default.decorators = [WithData(getData(defaultDataOptions))];
