/* eslint-disable no-undef */
//??? need install yup ???
// todo: create each part of the form as separate component
// todo: rm multipleness in radio and checkbox (they should be single)
// todo: render form only when all default values are set

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { useFormContext } from "react-hook-form";

import { buildData } from "../../schema";

import { FormActions } from "./FormActions";

import { AttorneyInfo } from "./FormSegments/AttorneyInfo";
import { PrincipalInfo } from "./FormSegments/PrincipalInfo";
import { RepresentativeInfo } from "./FormSegments/RepresentativeInfo";

import { Card, Form, Paragraph, Subtitle, VStack } from "@/components";

export const MchdForm = () => {
    const { handleSubmit } = useFormContext();

    const { mutate: save } = useMutation({
        mutationKey: "save",
        mutationFn: () => axios.post("https://jsonplaceholder.typicode.com/posts", {}),
    });

    const onSubmit = handleSubmit((data) => {
        // todo: collect data using actual schema
        const requestData = buildData(data);
        console.log("data", requestData);
        save();
    });

    return (
        <Form onSubmit={onSubmit} noValidate>
            <FormActions className="mb-1" />
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
    );
};
