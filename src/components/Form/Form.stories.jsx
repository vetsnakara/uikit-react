import * as ReactHookForm from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import {
    FormCheckbox,
    FormCheckboxGroup,
    FormDateInput,
    FormFile,
    FormInput,
    FormRadioGroup,
    FormSelect,
    FormTextarea,
} from "./inputs";

import { maxWidth } from "@/storybook/decorators";

import { initLib } from "@/utils";

import { Button, ButtonVariant, Card, Checkbox, Form, GroupContainer, Radio, VStack } from "@/components";

const { useForm, FormProvider } = initLib({ ReactHookForm });

export default {
    title: "form/Form",
    decorators: [maxWidth(600)],
};

const defaultValuesEmptyForm = {
    checkbox: false,
    text: "",
    textarea: "",
    date: "",
    dateRange: [],
    radio: "",
    select: "",
    selectMultiple: [],
    checkboxGroup: [],
    file: null,
};

const defaultValues = {
    checkbox: true,
    text: "abc",
    textarea: "ABC",
    date: "10.10.1984",
    dateRange: ["10.10.1984", "15.10.1984"],
    radio: "2",
    select: "2",
    selectMultiple: ["1", "3"],
    checkboxGroup: ["1", "3"],
    file: {
        id: 1,
        name: "Договор о партнерстве",
        size: 324234,
    },
};

const BaseForm = ({ form }) => {
    const {
        handleSubmit,
        reset,
        getValues,
        formState: { defaultValues },
    } = form;

    return (
        <FormProvider {...form}>
            <Form onSubmit={handleSubmit((data) => console.log("submit:", data))} noValidate>
                <GroupContainer className="mb-1">
                    <Button type="submit">Сохранить</Button>
                    <Button variant={ButtonVariant.Secondary} onClick={() => reset(defaultValues)}>
                        Сбросить
                    </Button>
                    <Button variant={ButtonVariant.Secondary} onClick={() => console.log(getValues())}>
                        Значения
                    </Button>
                </GroupContainer>

                <VStack gap={2} className="mb-2">
                    <Card>
                        <Form.Section>
                            <Form.Title>Одиночный чекбокс</Form.Title>
                            <FormCheckbox name="checkbox" label="чекбокс" />
                        </Form.Section>

                        <Form.Section>
                            <Form.Title>Текстовое поле</Form.Title>
                            <FormInput name="text" placeholder="Введите текст" />
                        </Form.Section>

                        <Form.Section>
                            <Form.Title>Многострочное текстовое поле</Form.Title>
                            <FormTextarea name="textarea" placeholder="Введите текст" />
                        </Form.Section>

                        <Form.Section>
                            <Form.Title>Дата</Form.Title>
                            <FormDateInput
                                name="date"
                                placeholder="Выберите дату"
                                maskOptions={{
                                    mask: "99.99.9999", // default
                                }}
                            />
                        </Form.Section>

                        <Form.Section>
                            <Form.Title>Диапазон дат</Form.Title>
                            <FormDateInput
                                name="dateRange"
                                placeholder="Выберите даты"
                                datepickerOptions={{ range: true }}
                                maskOptions={{
                                    mask: "99.99.9999 - 99.99.9999", // default
                                }}
                            />
                        </Form.Section>

                        <Form.Section>
                            <Form.Title>Радио-кнопки</Form.Title>
                            <FormRadioGroup name="radio">
                                <Radio label="One" value="1" />
                                <Radio label="Two" value="2" />
                                <Radio label="Three" value="3" />
                            </FormRadioGroup>
                        </Form.Section>

                        <Form.Section>
                            <Form.Title>Селект с одиночным выбором</Form.Title>
                            <FormSelect
                                name="select"
                                placeholder="Выберите"
                                items={[
                                    { value: "1", label: "One" },
                                    { value: "2", label: "Two" },
                                    { value: "3", label: "Three" },
                                ]}
                            />
                        </Form.Section>

                        <Form.Section>
                            <Form.Title>Селект с мультивыбором</Form.Title>
                            <FormSelect
                                name="selectMultiple"
                                items={[
                                    { value: "1", label: "One" },
                                    { value: "2", label: "Two" },
                                    { value: "3", label: "Three" },
                                ]}
                                selectpickerOptions={{
                                    liveSearch: true,
                                }}
                                multiple
                            />
                        </Form.Section>

                        {/* todo: add ajax-select */}

                        <Form.Section>
                            <Form.Title>Группа чекбоксов</Form.Title>
                            <FormCheckboxGroup name="checkboxGroup">
                                <Checkbox label="One" value="1" />
                                <Checkbox label="Two" value="2" />
                                <Checkbox label="Three" value="3" />
                            </FormCheckboxGroup>
                        </Form.Section>

                        <Form.Section>
                            <FormFile name="file" title="Загрузка файла" description="Допустимый размер 15 Мб" />
                        </Form.Section>
                    </Card>
                </VStack>
            </Form>
        </FormProvider>
    );
};

const schema = yup.object({
    checkbox: yup.boolean().required(),
    text: yup.string().required("Поле обязательно для заполнения"),
    textarea: yup.string().required("Поле обязательно для заполнения"),
    date: yup.string().required("Поле обязательно для заполнения"), //! isDate
    dateRange: yup.array().of(yup.string()).length(2).required("Поле обязательно для заполнения"),
    radio: yup.string().required("Поле обязательно для заполнения"),
    select: yup.string().required("Поле обязательно для заполнения"),
    selectMultiple: yup
        .array()
        .of(yup.string())
        .min(2, "Нужно выбрать не менее 2 пунктов")
        .required("Поле обязательно для заполнения"),
    checkboxGroup: yup.array().of(yup.string()).min(1, "Поле обязательно для заполнения"),
    file: yup
        .mixed()
        .test("required", "Поле обязательно для заполнения", (file) => {
            let result = false;
            if (file) result = true;
            return result;
        })
        .test("size", "Слишком большой файл", (file) => {
            let result = false;
            if (file && file.size < 1000000) result = true;
            return result;
        })
        .nullable(),
});

export const Default = () => {
    const form = useForm({ defaultValues: defaultValuesEmptyForm });

    return <BaseForm form={form} />;
};

export const Validation = () => {
    const form = useForm({
        defaultValues: defaultValuesEmptyForm,
        resolver: yupResolver(schema),
    });

    return <BaseForm form={form} />;
};

export const DefaultValues = () => {
    const form = useForm({
        defaultValues,
    });

    return <BaseForm form={form} />;
};

export const DefaultValuesValidation = () => {
    const form = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    return <BaseForm form={form} />;
};
