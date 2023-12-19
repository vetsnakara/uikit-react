import React from "react";
import { Subtitle, SectionTitle, Definitions } from "@uikit/components";

const DefinitionsList = ({ items, ...props }) => (
    <Definitions items={items} variant={Definitions.Variant.RowTable} fixWidth={Definitions.Width.W300} {...props} />
);

export const Section = ({ title, items = [], subsections = [] }) => (
    <>
        <Subtitle>{title}</Subtitle>
        {/* todo: don't use classnames for margins */}
        <DefinitionsList items={items} className="mb-3" />

        {subsections.map(({ title, items }, index) => (
            <React.Fragment key={index}>
                <SectionTitle>{title}</SectionTitle>
                {/* todo: don't use classnames for margins */}
                <DefinitionsList items={items} className={index !== items.length - 1 ? "mb-3" : ""} />
            </React.Fragment>
        ))}
    </>
);
