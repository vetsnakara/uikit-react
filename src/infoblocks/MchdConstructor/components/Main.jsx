//??? need install yup ???

import {
    Button,
    ButtonVariant,
    Card,
    Checkbox,
    Col,
    DateInput,
    Form,
    GroupContainer,
    Input,
    Paragraph,
    Radio,
    Row,
    Select,
    Separator,
    Subtitle,
    VStack,
} from "@uikit/components";
import { useForm } from "@uikit/hooks";

import { LegalEntityPrincipalType, PrincipalType } from "../constatns/constants";
import { documentTypes } from "../constatns/documentTypes";
import { managers } from "../constatns/managers";
import { mockState as data } from "../constatns/mockState";
import { regions } from "../constatns/regions";

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

const selectOptions = {
    size: 6,
};

// todo: create each part of the form as separate component
// todo: rm multipleness in radio and checkbox (they should be single)
// todo: render form only when all default values are set

const schema = {};

export const Main = () => {
    const { register, reset, handleSubmit, watch } = useForm({
        schema,
        defaultValues: data,
    });

    const principalType = watch("principalType");
    const noAttorneyType = watch("noAttorneyType");

    // console.log("principalType", principalType);
    // console.log("noAttorneyType", noAttorneyType);

    return (
        <Form onSubmit={handleSubmit((data) => console.log("data", data))} noValidate>
            <GroupContainer>
                <Button type="submit">Сохранить</Button>
                <Button variant={ButtonVariant.Secondary}>Отменить</Button>
                <Button variant={ButtonVariant.Secondary} onClick={reset}>
                    Сбросить
                </Button>
            </GroupContainer>

            {/* Сведения о доверенности */}
            <VStack gap={2} className="mb-2">
                <Card>
                    <Subtitle>Сведения о доверенности</Subtitle>
                    <Form.Section>
                        <Input
                            {...register("innerNumber")}
                            title="Внтуренний номер"
                            placeholder="Введите значение"
                            className="mb-1"
                            required
                        />
                        <Checkbox {...register("noNumber")} label="Без номера" />
                    </Form.Section>
                    <Form.Section>
                        <Row>
                            <Col md={6} className="mb-2 mb-md-0">
                                <DateInput
                                    {...register("attorneyDateBegin")}
                                    title="Дата выдачи доверенности"
                                    placeholder="Выберите дату"
                                    maskOptions={{
                                        // todo: memo (set as default)
                                        mask: "99.99.9999",
                                    }}
                                    required
                                />
                            </Col>
                            <Col md={6}>
                                <DateInput
                                    {...register("attorneyDateEnd")}
                                    title="Дата окончания доверенности"
                                    placeholder="Выберите дату"
                                    required
                                    maskOptions={{
                                        // todo: memo (set as default)
                                        mask: "99.99.9999",
                                    }}
                                />
                            </Col>
                        </Row>
                    </Form.Section>
                </Card>

                {/* Сведения о доверителе */}
                <Card>
                    <Subtitle>Сведения о доверителе</Subtitle>

                    {/* todo: create story for switch block form */}

                    {/* Тип доверителя */}
                    <Form.Section>
                        <Form.Fieldset>
                            <Form.Title>Тип доверитея</Form.Title>
                        </Form.Fieldset>
                        <Radio.Group {...register("principalType")} component={Row}>
                            <Col xs="auto" className="mb-2 mb-md-0">
                                <Radio label="Юридическое лицо" value={PrincipalType.LegalEntityPrincipal} />
                            </Col>
                            <Col xs="auto">
                                <Radio
                                    label="Индивидуальный предприниматель"
                                    value={PrincipalType.IndividualEntrepreneurPrincipal}
                                />
                            </Col>
                        </Radio.Group>
                    </Form.Section>

                    {/* Тип доверителя: Юридическое лицо */}
                    {principalType === PrincipalType.LegalEntityPrincipal && (
                        <>
                            <Form.Section>
                                <Input
                                    {...register("principalCompanyName")}
                                    title="Наименование организации"
                                    required
                                />
                            </Form.Section>
                            <Form.Section>
                                <Row>
                                    <Col md={4} className="mb-2 mb-md-0">
                                        <Input {...register("principalCompanyInn")} title="ИНН" required />
                                    </Col>
                                    <Col md={4} className="mb-2 mb-md-0">
                                        <Input {...register("principalCompanyKpp")} title="КПП" required />
                                    </Col>
                                    <Col md={4}>
                                        <Input {...register("principalCompanyOgrn")} title="ОГРН" required />
                                    </Col>
                                </Row>
                            </Form.Section>
                            <Form.Section>
                                <Select
                                    {...register("principalCompanyRegion")}
                                    title="Регион"
                                    items={selectItems.regions}
                                    selectpickerOptions={selectOptions}
                                    required
                                />
                            </Form.Section>
                        </>
                    )}

                    {/* Тип доверителя: Индивидуальный предприниматель */}
                    {principalType === PrincipalType.IndividualEntrepreneurPrincipal && (
                        <>
                            <Form.Section>
                                <Row>
                                    <Col md={6} className="mb-2 mb-md-0">
                                        <Input {...register("principalPersonName")} title="Наименование ИП" required />
                                    </Col>
                                    <Col md={6} className="mb-2 mb-md-0">
                                        <Input {...register("principalPersonOgrnip")} title="ОГРНИП" required />
                                    </Col>
                                </Row>
                            </Form.Section>
                        </>
                    )}

                    <Separator className="my-3" />

                    {/* Тип доверителя: Юридическое лицо */}
                    {/* Сведения о лице, действующем без доверенности */}
                    {principalType === PrincipalType.LegalEntityPrincipal && (
                        <>
                            <Subtitle>Сведения о лице, действующем без доверенности</Subtitle>

                            {/* Лицо, действующее без доверенности */}
                            <Form.Section>
                                <Form.Fieldset>
                                    <Form.Title>Лицо, действующее без доверенности</Form.Title>
                                </Form.Fieldset>
                                <Radio.Group {...register("noAttorneyType")} component={Row}>
                                    <Col xs="auto" className="mb-2 mb-md-0">
                                        <Radio
                                            label="Юридическое лицо"
                                            value={LegalEntityPrincipalType.LegalEntityPerson}
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Radio label="Физическое лицо" value={LegalEntityPrincipalType.Person} />
                                    </Col>
                                </Radio.Group>
                            </Form.Section>

                            {/* Лицо без доверенности: Юридическое лицо */}
                            {noAttorneyType === LegalEntityPrincipalType.LegalEntityPerson && (
                                <>
                                    <Form.Section>
                                        <Input
                                            {...register("noAttorneyCompanyName")}
                                            title="Наименование организации"
                                            required
                                        />
                                    </Form.Section>
                                    <Form.Section>
                                        <Row>
                                            <Col md={4} className="mb-2 mb-md-0">
                                                <Input {...register("noAttorneyCompanyInn")} title="ИНН" required />
                                            </Col>
                                            <Col md={4} className="mb-2 mb-md-0">
                                                <Input {...register("noAttorneyCompanyKpp")} title="КПП" required />
                                            </Col>
                                            <Col md={4}>
                                                <Input {...register("noAttorneyCompanyOgrn")} title="ОГРН" required />
                                            </Col>
                                        </Row>
                                    </Form.Section>
                                    <Form.Section>
                                        <Select
                                            title="Регион"
                                            items={selectItems.regions}
                                            selectpickerOptions={selectOptions}
                                            required
                                        />
                                    </Form.Section>

                                    <Separator className="my-3" />

                                    <Subtitle>Сведения о лице, действующем без доверенности</Subtitle>

                                    <Form.Section>
                                        <Row>
                                            <Col md={6} className="mb-2 mb-md-0">
                                                <Input
                                                    {...register("noAttorneyCompanyDirectorLastName")}
                                                    title="Фамилия"
                                                    required
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <Input
                                                    {...register("noAttorneyCompanyDirectorFirstName")}
                                                    title="Имя"
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Section>
                                    <Form.Section>
                                        <Row>
                                            <Col md={6} className="mb-2 mb-md-0">
                                                <Input
                                                    {...register("noAttorneyCompanyDirectorMiddleName")}
                                                    title="Отчество"
                                                    required
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <DateInput
                                                    {...register("noAttorneyCompanyDirectorBirthDate")}
                                                    title="Дата рождения"
                                                    placeholder="Выберите дату"
                                                    maskOptions={{
                                                        // todo: memo (set as default)
                                                        mask: "99.99.9999",
                                                    }}
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Section>
                                    <Form.Section>
                                        <Row>
                                            <Col md={6} className="mb-2 mb-md-0">
                                                <Input
                                                    {...register("noAttorneyCompanyDirectorSnils")}
                                                    title="СНИЛС"
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Section>
                                </>
                            )}

                            {/* Лицо без доверенности: Физическое лицо */}
                            {noAttorneyType === LegalEntityPrincipalType.Person && (
                                <>
                                    <Form.Section>
                                        <Row>
                                            <Col md={6} className="mb-2 mb-md-0">
                                                <Input
                                                    {...register("noAttorneyPersonLastName")}
                                                    title="Фамилия"
                                                    required
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <Input
                                                    {...register("noAttorneyPersonFirstName")}
                                                    title="Имя"
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Section>
                                    <Form.Section>
                                        <Row>
                                            <Col md={6} className="mb-2 mb-md-0">
                                                <Input
                                                    {...register("noAttorneyPersonMiddleName")}
                                                    title="Отчество"
                                                    required
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <DateInput
                                                    {...register("noAttorneyPersonBirthDate")}
                                                    title="Дата рождения"
                                                    placeholder="Выберите дату"
                                                    maskOptions={{
                                                        // todo: memo (set as default)
                                                        mask: "99.99.9999",
                                                    }}
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Section>
                                    <Form.Section>
                                        <Row>
                                            <Col md={6} className="mb-2 mb-md-0">
                                                <Input {...register("noAttorneyPersonSnils")} title="СНИЛС" required />
                                            </Col>
                                            <Col md={6}>
                                                <Input {...register("noAttorneyPersonInn")} title="ИНН" required />
                                            </Col>
                                        </Row>
                                    </Form.Section>
                                </>
                            )}
                        </>
                    )}

                    {/* Тип доверителя: Индивидуальный предприниматель */}
                    {/* Сведения о подписанте */}
                    {principalType === PrincipalType.IndividualEntrepreneurPrincipal && (
                        <>
                            <Form.Section>
                                <Row>
                                    <Col md={6} className="mb-2 mb-md-0">
                                        <Input {...register("signatoryLastName")} title="Фамилия" required />
                                    </Col>
                                    <Col md={6}>
                                        <Input {...register("signatoryFirstName")} title="Имя" required />
                                    </Col>
                                </Row>
                            </Form.Section>
                            <Form.Section>
                                <Row>
                                    <Col md={6} className="mb-2 mb-md-0">
                                        <Input {...register("signatoryMiddleName")} title="Отчество" required />
                                    </Col>
                                    <Col md={6}>
                                        <DateInput
                                            {...register("signatoryBirthDate")}
                                            title="Дата рождения"
                                            placeholder="Выберите дату"
                                            maskOptions={{
                                                // todo: memo (set as default)
                                                mask: "99.99.9999",
                                            }}
                                            required
                                        />
                                    </Col>
                                </Row>
                            </Form.Section>
                            <Form.Section>
                                <Row>
                                    <Col md={6} className="mb-2 mb-md-0">
                                        <Input {...register("signatorySnils")} title="СНИЛС" required />
                                    </Col>
                                    <Col md={6}>
                                        <Input {...register("signatoryInn")} title="ИНН" required />
                                    </Col>
                                </Row>
                            </Form.Section>
                        </>
                    )}
                </Card>

                <Card>
                    <Subtitle>Сведения о представителе</Subtitle>

                    <Form.Section>
                        <Row>
                            <Col md={6} className="mb-2 mb-md-0">
                                <Select
                                    {...register("representativeId")}
                                    title="ФИО"
                                    items={selectItems.managers}
                                    selectpickerOptions={selectOptions}
                                    required
                                />
                            </Col>
                            <Col md={6}>
                                <DateInput
                                    {...register("representativeBirthDate")}
                                    title="Дата рождения"
                                    placeholder="Выберите дату"
                                    maskOptions={{
                                        // todo: memo (set as default)
                                        mask: "99.99.9999",
                                    }}
                                    required
                                />
                            </Col>
                        </Row>
                    </Form.Section>
                    <Form.Section>
                        <Row>
                            <Col md={6} className="mb-2 mb-md-0">
                                <Input {...register("representativeSnils")} title="СНИЛС" required />
                            </Col>
                            <Col md={6}>
                                <Input {...register("representativeInn")} title="ИНН" required />
                            </Col>
                        </Row>
                    </Form.Section>
                    <Form.Section>
                        <Select
                            title="Вид документа"
                            {...register("representativeDocument")}
                            items={selectItems.documentTypes}
                            selectpickerOptions={selectOptions}
                            required
                        />
                    </Form.Section>
                    <Form.Section>
                        <Row>
                            <Col md={6} className="mb-2 mb-md-0">
                                <Input
                                    {...register("representativeDocumentNumber")}
                                    title="Серия и номер документа"
                                    required
                                />
                            </Col>
                            <Col md={6}>
                                <DateInput
                                    {...register("representativeDocumentDateBegin")}
                                    title="Дата выдачи документа"
                                    placeholder="Выберите дату"
                                    maskOptions={{
                                        // todo: memo (set as default)
                                        mask: "99.99.9999",
                                    }}
                                    required
                                />
                            </Col>
                        </Row>
                    </Form.Section>
                    <Form.Section>
                        <Input
                            {...register("representativeDocumentOrganizationName")}
                            title="Наименование органа, выдавшего документ"
                            required
                        />
                    </Form.Section>
                    <Form.Section>
                        <Input
                            {...register("representativeDocumentOrganizationCode")}
                            title="Код подразделения органа, выдавшего документ"
                            required
                        />
                    </Form.Section>
                </Card>
                <Card>
                    <Subtitle>Сведения о полномочиях</Subtitle>
                    <Paragraph>Подписание кадровых документов от лица работодателя</Paragraph>
                </Card>
            </VStack>

            <GroupContainer>
                <Button type="submit">Сохранить</Button>
                <Button variant={ButtonVariant.Secondary}>Отменить</Button>
            </GroupContainer>
        </Form>
    );
};
