import { rest } from "msw";
import React from "react";

import { MchdConstructor } from "../MchdConstructor";

import { LegalEntityPrincipalType, PrincipalType, Status, UserRole } from "../constatns/constants";

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

// change key to force update element tree
export const Default = (args) => (
    <React.Fragment key={JSON.stringify(args)}>
        {/* <DataProvider data={getData(args)}> */}
        <MchdConstructor />
        {/* </DataProvider> */}
    </React.Fragment>
);

Default.args = {
    status: Status.Draft,
    userRole: UserRole.Owner,
    principalType: PrincipalType.LegalEntityPrincipal,
    legalEntityPrincipalType: LegalEntityPrincipalType.LegalEntityPerson,
};

Default.parameters = {
    msw: {
        handlers: [
            // filter
            rest.post("https://jsonplaceholder.typicode.com/posts", async (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({
                        code: "SUCCESS",
                    })
                );
            }),
        ],
    },
};
