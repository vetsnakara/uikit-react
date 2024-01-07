import * as yup from "yup";

// todo: ??? зачем подгружать бандлы react, react-dom, react-uikit, если не странице не используется рекат ???
// todo: intellisent for @uikit/comopnents (hooks)
import {
    Card,
    Input,
    Textarea,
    DateInput,
    Checkbox,
    Radio,
    Form,
    Select,
    Button,
    ButtonVariant,
    VStack,
    GroupContainer,
    File,
    Container,
    Row,
    Col,
} from "@uikit/components";

// todo: add prettier (with 4 spaces indentation)

// todo: stories for
// Object.assign(Form, {
//     Section: FormSection,
//     Description: FormDescription,
//     Fieldset: FormFieldset,
//     Title: FormTitle,
// });

//! need types
import { useForm } from "@uikit/hooks";

import { maxWidth } from "../../../.storybook/decorators";

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

const BaseForm = ({
    register,
    handleSubmit,
    reset,
    clear,
    getData,
    formState, //! значения нужно брать через "." formState.isValid (чтобы работал proxy)
}) => {
    console.log("formState.isValid", formState.isValid);

    return (
        <Form onSubmit={handleSubmit((data) => console.log("submit:", data))} noValidate>
            <GroupContainer className="mb-1">
                <Button disabled={!formState.isValid} type="submit">
                    Сохранить
                </Button>
                {/* todo: enabled if hasChanges/hasFieldsChange ? */}
                <Button variant={ButtonVariant.Secondary} onClick={reset}>
                    Сбросить
                </Button>
                <Button variant={ButtonVariant.Secondary} onClick={clear}>
                    Очистить
                </Button>
                <Button variant={ButtonVariant.Secondary} onClick={() => console.log(getData())}>
                    Значения
                </Button>
            </GroupContainer>

            {/* Сведения о доверенности */}
            <VStack gap={2} className="mb-2">
                <Card>
                    <Form.Section>
                        <Form.Title>Одиночный чекбокс</Form.Title>
                        <Checkbox {...register("checkbox")} label="чекбокс" />
                    </Form.Section>

                    <Form.Section>
                        <Form.Title>Текстовое поле</Form.Title>
                        <Input {...register("text")} placeholder="Введите текст" />
                    </Form.Section>

                    <Form.Section>
                        <Form.Title>Многострочное текстовое поле</Form.Title>
                        <Textarea {...register("textarea")} placeholder="Введите текст" />
                    </Form.Section>

                    <Form.Section>
                        <Form.Title>Дата</Form.Title>
                        <DateInput
                            {...register("date")}
                            placeholder="Выберите дату"
                            maskOptions={{
                                mask: "99.99.9999", // default
                            }}
                        />
                    </Form.Section>

                    <Form.Section>
                        <Form.Title>Диапазон дат</Form.Title>
                        <DateInput
                            {...register("dateRange")}
                            placeholder="Выберите даты"
                            datepickerOptions={{ range: true }}
                            maskOptions={{
                                mask: "99.99.9999 - 99.99.9999", // default
                            }}
                        />
                    </Form.Section>

                    <Form.Section>
                        <Form.Title>Радио-кнопки</Form.Title>
                        {/* todo: case of vertical stack of checkbox (without wrapper div element) */}
                        <Radio.Group {...register("radio")}>
                            <Radio label="One" value="1" />
                            <Radio label="Two" value="2" />
                            <Radio label="Three" value="3" />
                        </Radio.Group>
                    </Form.Section>

                    <Form.Section>
                        <Form.Title>Селект с одиночным выбором</Form.Title>
                        <Select
                            {...register("select")}
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
                        <Select
                            {...register("selectMultiple")}
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

                    <Form.Section>
                        <Form.Title>Группа чекбоксов</Form.Title>
                        <Checkbox.Group {...register("checkboxGroup")}>
                            <Checkbox label="One" value="1" />
                            <Checkbox label="Two" value="2" />
                            <Checkbox label="Three" value="3" />
                        </Checkbox.Group>
                    </Form.Section>

                    <Form.Section>
                        <File {...register("file")} title="Загрузка файла" description="Допустимый размер 15 Мб" />
                    </Form.Section>
                </Card>
            </VStack>
        </Form>
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
    selectMultiple: ["2", "3"],
    checkboxGroup: ["1", "3"],
    file: {
        id: 1,
        name: "Договор о партнерстве",
        size: 324234,
    },
};

const schema = {
    checkbox: yup.boolean().required(),
    text: yup.string().required("Поле обязательно для заполнения"),
    textarea: yup.string().required("Поле обязательно для заполнения"),
    date: yup.string().required("Поле обязательно для заполнения"), //! isDate
    dateRange: yup.array().of(yup.string()).length(2).required("Поле обязательно для заполнения"),
    radio: yup.string().required("Поле обязательно для заполнения"),
    select: yup.string().required("Поле обязательно для заполнения"),
    selectMultiple: yup.array().of(yup.string()).min(1, "Поле обязательно для заполнения"),
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
};

export const FileOnly = () => {
    const { handleSubmit, register, reset } = useForm({
        // defaultValues,
    });

    return (
        <Form onSubmit={handleSubmit((data) => console.log("data", data))} noValidate>
            <GroupContainer className="mb-1">
                {/* todo: enabled if isValid and !loading */}
                <Button type="submit">Сохранить</Button>
                {/* todo: enabled if hasChanges/hasFieldsChange ? */}
                <Button variant={ButtonVariant.Secondary} onClick={reset}>
                    Сбросить
                </Button>
            </GroupContainer>

            {/* Сведения о доверенности */}
            <VStack gap={2} className="mb-2">
                <Card>
                    <Form.Section>
                        <File {...register("file")} title="Загрузка файла" description="Допустимый размер 15 Мб" />
                    </Form.Section>
                </Card>
            </VStack>
        </Form>
    );
};

export const Default = () => {
    const formProps = useForm({
        defaultValues: {
            //   date: "10.10.1984",
            //   checkbox: true,
            //   text: "abc",
        },
    });

    //   const checkboxValue = formProps.watch("checkbox");
    //   const textValue = formProps.watch("text");
    //   console.log("checkboxValue", checkboxValue);
    //   console.log("textValue", textValue);

    //   const watchValues = formProps.watch();
    //   console.log("watchValues", watchValues);

    //   const watchValues = formProps.watch();
    //   console.log("watchValues", watchValues);

    return (
        <Layout aside={"state"}>
            <BaseForm {...formProps} />
        </Layout>
    );
};

export const Validation = () => {
    const formProps = useForm({ schema });

    return (
        <Layout aside={"state"}>
            <BaseForm {...formProps} />
        </Layout>
    );
};

export const DefaultValues = () => {
    const formProps = useForm({
        defaultValues,
    });

    return (
        <Layout aside={"state"}>
            <BaseForm {...formProps} />
        </Layout>
    );
};

export const DefaultValuesValidation = () => {
    const formProps = useForm({
        defaultValues,
        schema,
    });

    return (
        <Layout aside={"state"}>
            <BaseForm {...formProps} />
        </Layout>
    );
};

export const IsValid = () => {
    const formProps = useForm({
        // defaultValues,
        schema,
    });

    return (
        <Layout aside={"state"}>
            <BaseForm {...formProps} />
        </Layout>
    );
};
