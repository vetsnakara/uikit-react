import React from "react";

import { Definitions, SectionTitle, Subtitle } from "@/components";

const DefinitionsList = ({ items, ...props }) => (
    <Definitions items={items} variant={Definitions.Variant.RowTable} fixWidth={Definitions.Width.W300} {...props} />
);

export const Section = ({ title, items = [], subsections = [] }) => (
    <>
        <Subtitle>{title}</Subtitle>
        <DefinitionsList items={items} className="mb-3" />

        {subsections.map(({ title, items }, index) => (
            <React.Fragment key={index}>
                <SectionTitle>{title}</SectionTitle>
                <DefinitionsList items={items} className={index !== items.length - 1 ? "mb-3" : ""} />
            </React.Fragment>
        ))}
    </>
);
