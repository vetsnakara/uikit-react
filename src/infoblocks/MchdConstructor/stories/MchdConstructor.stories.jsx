import React from "react";
import * as PropTypes from "prop-types";
import { MchdConstructor } from "../MchdConstructor";
import { getData } from "./data";
import { WithData, WithInfoblockLayout } from "./decorators";
import { LegalEntityPrincipalType, PrincipalType, UserRole, Status } from "../constants";
import { Provider } from "../context";

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
