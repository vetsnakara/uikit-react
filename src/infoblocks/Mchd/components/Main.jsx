import React from "react";

import { useAppState } from "../context";

import { Section } from "./Section";

import { Card, Paragraph, Separator, Subtitle } from "@/components";

export const Main = () => {
    const { sections } = useAppState();

    return (
        <Card>
            {sections.map((section, index) => (
                <React.Fragment key={index}>
                    <Section {...section} />
                    {/* todo: don't use classnames for margins */}
                    <Separator className="my-3" />
                </React.Fragment>
            ))}

            <Subtitle>Сведения о полномочиях</Subtitle>
            <Paragraph>Подписание кадровых документов от лица работодателя</Paragraph>
        </Card>
    );
};
