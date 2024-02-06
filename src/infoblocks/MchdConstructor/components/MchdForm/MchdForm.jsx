/* eslint-disable no-undef */
//??? need install yup ???
// todo: create each part of the form as separate component
// todo: rm multipleness in radio and checkbox (they should be single)
// todo: render form only when all default values are set

import { FormProvider, useForm } from "react-hook-form";

import { Card, Form, Paragraph, Subtitle, VStack } from "@uikit/components";

import { yupResolver } from "@hookform/resolvers/yup";

import { documentTypes } from "../../constatns/documentTypes";
import { managers } from "../../constatns/managers";
import { mockState as defaultValues } from "../../constatns/mockState";
import { regions } from "../../constatns/regions";
import { buildData, schema } from "../../schema";

import { DataProvider } from "../../context/DataContext";

import { FormActions } from "./FormActions";
import { AttorneyInfo } from "./FormSegments/AttorneyInfo";
import { PrincipalInfo } from "./FormSegments/PrincipalInfo";
import { RepresentativeInfo } from "./FormSegments/RepresentativeInfo";

const selectItems = {
    managers: managers.map(({ id, firstName, lastName, middleName }) => ({
        value: id,
        label: [lastName, firstName, middleName].join(" "),
    })),
    regions: regions.map(({ key, text }) => ({
        value: key,
        label: text,
    })),
    documentTypes: documentTypes.map(({ code, name }) => ({
        value: code,
        label: name,
    })),
};

export const MchdForm = () => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(schema),
        shouldFocusError: false, // не со всеми контролами работает корректно (DateInput)
    });

    const { handleSubmit } = methods;

    const onSubmit = handleSubmit((data) => {
        // todo: collect data using actual schema
        const requestData = buildData(data);
        console.log("data", requestData);
    });

    return (
        <DataProvider data={{ selectItems }}>
            <FormProvider {...methods}>
                <Form onSubmit={onSubmit} noValidate>
                    <VStack gap={2} className="mb-2">
                        {/* Сведения о доверенности */}
                        <AttorneyInfo />

                        {/* Сведения о доверителе */}
                        <PrincipalInfo />

                        {/* Сведения о представителе */}
                        <RepresentativeInfo />

                        <Card>
                            <Subtitle>Сведения о полномочиях</Subtitle>
                            <Paragraph>Подписание кадровых документов от лица работодателя</Paragraph>
                        </Card>
                    </VStack>
                    <FormActions />
                </Form>
            </FormProvider>
        </DataProvider>
    );
};