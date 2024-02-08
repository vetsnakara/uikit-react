import * as ReactHookForm from "react-hook-form";

// todo: intellisent for @uikit/comopnents (hooks)
import {
    Button,
    ButtonVariant,
    Card,
    Checkbox,
    Col,
    Container,
    Form,
    GroupContainer,
    Radio,
    Row,
    Select,
    VStack,
} from "@uikit/components";

// todo: add prettier (with 4 spaces indentation)

// todo: stories for
// Object.assign(Form, {
//     Section: FormSection,
//     Description: FormDescription,
//     Fieldset: FormFieldset,
//     Title: FormTitle,
// });

import { yupResolver } from "@hookform/resolvers/yup";

import { maxWidth } from "../../../.storybook/decorators";

import { initLib } from "../../utils/libAdapter";

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

const { useForm, useController, FormProvider } = initLib({ ReactHookForm });

export default {
    title: "form/Form",
    parameters: {
        // layout: "centered",
    },
    decorators: [maxWidth(1000)],
};

//! cases
// no schema, no default values
// with default values
// with reset
// with schema
// with dynamic form configuration (watch)
// with dynamic fields (array fields)
// with nested components
// with scroll to error
// multistep form
// states: isValid, isChanged, ...
// reset to defaultValues
// clear form (if no defaultValues are set)

// todo: форма с распределенными контроломаи

const BaseForm = ({ form }) => {
    const { handleSubmit, reset, getValues, formState } = form;

    console.log("formState.errors", formState.errors);

    return (
        <FormProvider {...form}>
            <Form onSubmit={handleSubmit((data) => console.log("submit:", data))} noValidate>
                <GroupContainer className="mb-1">
                    <Button type="submit">Сохранить</Button>
                    <Button variant={ButtonVariant.Secondary} onClick={reset}>
                        Сбросить
                    </Button>
                    <Button variant={ButtonVariant.Secondary} onClick={() => console.log(getValues())}>
                        Значения
                    </Button>
                </GroupContainer>

                {/* Сведения о доверенности */}
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

const Layout = ({ children, aside }) => (
    <Container>
        <Row>
            <Col xs={8}>{children}</Col>
            <Col>{aside}</Col>
        </Row>
    </Container>
);

const defaultValues = {
    checkbox: true,
    text: "abc",
    textarea: "ABC",
    date: "10.10.1984",
    dateRange: ["10.10.1984", "15.10.1984"],
    // date: "",
    // dateRange: [],
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
            // console.log("required:result", result);
            return result;
        })
        .test("size", "Слишком большой файл", (file) => {
            let result = false;
            if (file && file.size < 1000000) result = true;
            // console.log("size:result", result);
            return result;
        })
        .nullable(),
});

export const Default = () => {
    const form = useForm();

    return (
        <Layout aside={"state"}>
            <BaseForm form={form} />
        </Layout>
    );
};

export const Validation = () => {
    const form = useForm({
        defaultValues: {
            // selectMultiple: [],
        },
        resolver: yupResolver(schema),
    });

    const {
        formState: { errors },
        getValues,
    } = form;

    console.log("errors", errors);
    console.log("values", getValues());

    return (
        <Layout aside={"state"}>
            <BaseForm form={form} />
        </Layout>
    );
};

export const DefaultValues = () => {
    const form = useForm({
        defaultValues,
    });

    return (
        <Layout aside={"state"}>
            <BaseForm form={form} />
        </Layout>
    );
};

export const DefaultValuesValidation = () => {
    const form = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    return (
        <Layout aside={"state"}>
            <BaseForm form={form} />
        </Layout>
    );
};

export const NativeMultipleSelect = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: yupResolver(
            yup.object({
                multipleSelect: yup.array().of(yup.string()).min(2),
            })
        ),
    });

    console.log("errors", errors);
    console.log("values", getValues());

    return (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
            <select {...register("multipleSelect")} multiple>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
            {errors.multipleSelect && <p>{errors.multipleSelect.message}</p>}
            <button>Submit</button>
        </form>
    );
};

export const SingleSelect = () => {
    const {
        handleSubmit,
        formState: { errors },
        control,
        getValues,
    } = useForm({
        resolver: yupResolver(
            yup.object({
                select: yup.string().required(),
            })
        ),
    });

    const { field } = useController({ control, name: "select" });

    console.log("errors", errors);
    console.log("values", getValues());

    return (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
            <Select
                value={field.value}
                onChange={field.onChange}
                items={[
                    { value: "1", label: "One" },
                    { value: "2", label: "Two" },
                    { value: "3", label: "Three" },
                ]}
                placeholder="Выберите"
            ></Select>
            {errors.select && <p>{errors.select.message}</p>}
            <button>Submit</button>
        </form>
    );
};

export const MultipleSelect = () => {
    const form = useForm({
        defaultValues: {
            //! need defalut value for multiple select (for proper validation)
            //! or need `required`
            // multipleSelect: [],
        },
        resolver: yupResolver(
            yup.object({
                multipleSelect: yup.array().of(yup.string()).min(2).required(),
            })
        ),
    });

    const {
        handleSubmit,
        getValues,
        formState: { errors },
    } = form;

    console.log("errors", errors);
    console.log("values", getValues());

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
                <FormSelect
                    name="multipleSelect"
                    items={[
                        { value: "1", label: "One" },
                        { value: "2", label: "Two" },
                        { value: "3", label: "Three" },
                    ]}
                    multiple
                ></FormSelect>
                <button>Submit</button>
            </form>
        </FormProvider>
    );
};
