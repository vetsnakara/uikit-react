import { useMemo } from "react";
import * as yup from "yup"; //??? need install yup ???

import { useForm } from "@uikit/hooks";

import {
  Card,
  Input,
  DateInput,
  Subtitle,
  Paragraph,
  Checkbox,
  Radio,
  Row,
  Col,
  Form,
  Select,
  Separator,
  Button,
  ButtonVariant,
  VStack,
  GroupContainer,
} from "@uikit/components";

// todo: create each part of the form as separate component
// todo: rm multipleness in radio and checkbox (they should be single)
// todo: render form only when all default values are set

const schema = {
  // noNumber: yup.boolean().required(),
  // extensionNumber: yup.string().required("Поле обязательно для заполнения"),
  // attorneyDateBegin: yup.string().required("Поле обязательно для заполнения"),
  // attorneyDateEnd: yup.string().required("Поле обязательно для заполнения"),
  // principalType: yup.string().required("Поле обязательно для заполнения"),
  // region: yup.string().required("Поле обязательно для заполнения"),
  // regionMultiple: yup
  //   .array()
  //   .of(yup.string())
  //   .min(1, "Поле обязательно для заполнения"),
  // checkboxArr: yup.array().of(yup.string()).min(1),
};

export const Main = () => {
  const { register, reset, handleSubmit, formState, proxyFormState, watch } =
    useForm({
      schema,
      defaultValues: {
        // extensionNumber: "abc",
        // noNumber: true,
        // attorneyDateBegin: "10.10.1984",
        // attorneyDateEnd: "15.10.1984",
        // principalType: "3",
        // region: "2",
        // regionMultiple: ["2", "3"],
        // checkboxArr: ["1", "2"],
      },
    });

  // todo: memo other options
  const selectItems = useMemo(
    () => [
      { value: "1", label: "One" },
      { value: "2", label: "Two" },
      { value: "3", label: "Three" },
    ],
    []
  );

  // const noNumber = watch("noNumber");
  // const noNumber = false;
  // console.log("noNumber", noNumber);

  // const extNumber = watch("extensionNumber");
  // console.log("extNumber", extNumber);

  return (
    <Form
      onSubmit={handleSubmit((data) => console.log("data", data))}
      noValidate
    >
      <GroupContainer>
        <Button type="submit">Сохранить</Button>
        <Button variant={ButtonVariant.Secondary}>Отменить</Button>
        <Button variant={ButtonVariant.Secondary} onClick={reset}>
          Сбросить
        </Button>
      </GroupContainer>
      <Card>
        <Subtitle>Сведения о доверенности</Subtitle>

        <Form.Section>
          {/* todo: don't use classes */}
          <Input
            {...register("extensionNumber")}
            title="Внтуренний номер"
            placeholder="Введите значение"
            className="mb-1"
            required
          />
          <Checkbox {...register("noNumber")} label="Без номера" />

          <Separator />

          <Checkbox.Group {...register("checkboxArr")}>
            <Checkbox label="One" value="1" />
            <Checkbox label="Two" value="2" />
            <Checkbox label="Three" value="3" />
          </Checkbox.Group>
          <Separator />
        </Form.Section>

        <Form.Section>
          <Row>
            {/* todo: dont use classnames */}
            <Col md={6} className="mb-2 mb-md-0">
              {/* todo: add range Dateinput example */}
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
                // placeholder="Выберите дату"
                required
                // maskOptions={{
                //   // todo: memo (set as default)
                //   mask: "99.99.9999",
                // }}
              />
            </Col>
          </Row>

          <Separator />

          {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

          <Radio.Group {...register("principalType")} component={Row}>
            <Col xs="auto" className="mb-2 mb-md-0">
              <Radio label="Юридическое лицо" value="1" />
            </Col>
            <Col xs="auto">
              <Radio label="Индивидуальный предприниматель" value="3" />
            </Col>
          </Radio.Group>

          <Select
            {...register("region")}
            title="Регион"
            placeholder="Выберите"
            items={[
              { value: "1", label: "One" },
              { value: "2", label: "Two" },
              { value: "3", label: "Three" },
            ]}
            required
          />

          <Select
            {...register("regionMultiple")}
            title="Регион Multiple"
            placeholder="Выберите"
            items={[
              { value: "1", label: "One" },
              { value: "2", label: "Two" },
              { value: "3", label: "Three" },
            ]}
            multiple
            required
          />

          {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        </Form.Section>
      </Card>
    </Form>
  );

  return (
    <Form
      onSubmit={handleSubmit((data) => console.log("data", data))}
      noValidate
    >
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
            {/* todo: don't use classes */}
            <Input
              {...register("extensionNumber")}
              title="Внтуренний номер"
              placeholder="Введите значение"
              className="mb-1"
              required
            />
            {/* <Checkbox {...register("noNumber")} label="Без номера" /> */}
          </Form.Section>
          <Form.Section>
            <Row>
              {/* todo: dont use classnames */}
              <Col md={6} className="mb-2 mb-md-0">
                {/* todo: add range Dateinput example */}
                {/* <DateInput
                                    {...register("attorneyDateBegin")}
                                    title="Дата выдачи доверенности"
                                    placeholder="Выберите дату"
                                    maskOptions={{
                                        // todo: memo (set as default)
                                        mask: "99.99.9999",
                                    }}
                                    required
                                /> */}
              </Col>
              <Col md={6}>
                {/* <DateInput
                                    {...register("attorneyDateEnd")}
                                    title="Дата окончания доверенности"
                                    placeholder="Выберите дату"
                                    required
                                    maskOptions={{
                                        // todo: memo (set as default)
                                        mask: "99.99.9999",
                                    }}
                                /> */}
              </Col>
            </Row>

            <Separator />

            {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

            <Radio.Group {...register("principalType")} component={Row}>
              {/* <Col xs="auto" className="mb-2 mb-md-0">
                                <Radio label="Юридическое лицо" value="1" />
                            </Col>
                            <Col xs="auto">
                                <Radio label="Индивидуальный предприниматель" value="3" />
                            </Col> */}
            </Radio.Group>

            {/* <Select
                            {...register("region")}
                            title="Регион"
                            placeholder="Выберите"
                            items={[
                                { value: "1", label: "One" },
                                { value: "2", label: "Two" },
                                { value: "3", label: "Three" },
                            ]}
                            required
                        /> */}

            {/* <Select
                            {...register("regionMultiple")}
                            title="Регион Multiple"
                            items={[
                                { value: "1", label: "One" },
                                { value: "2", label: "Two" },
                                { value: "3", label: "Three" },
                            ]}
                            multiple
                            required
                        /> */}

            <Checkbox.Group {...register("checkboxArr")}>
              <Checkbox label="One" value="1" />
              <Checkbox label="Two" value="2" />
              <Checkbox label="Three" value="3" />
            </Checkbox.Group>

            {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
          </Form.Section>
        </Card>

        {/* Сведения о доверителе */}
        <Card>
          <Subtitle>Сведения о доверителе</Subtitle>

          {/* Тип доверителя */}
          <Form.Section>
            <Form.Fieldset>
              <Form.Title>Тип доверитея</Form.Title>
            </Form.Fieldset>
            {/* <Radio.Group name="principalType" value="1" component={Row}>
                            <Col xs="auto" className="mb-2 mb-md-0">
                                <Radio label="Юридическое лицо" value="1" />
                            </Col>
                            <Col xs="auto">
                                <Radio label="Индивидуальный предприниматель" value="3" />
                            </Col>
                        </Radio.Group> */}
          </Form.Section>

          {/* Тип доверителя: Юридическое лицо */}
          <>
            <Form.Section>
              <Input title="Наименование организации" required />
            </Form.Section>
            <Form.Section>
              <Row>
                <Col md={4} className="mb-2 mb-md-0">
                  <Input title="ИНН" required />
                </Col>
                <Col md={4} className="mb-2 mb-md-0">
                  <Input title="КПП" required />
                </Col>
                <Col md={4}>
                  <Input title="ОГРН" required />
                </Col>
              </Row>
            </Form.Section>
            <Form.Section>
              <Select title="Регион" items={[]} required />
            </Form.Section>
          </>

          {/* Тип доверителя: Индивидуальный предприниматель */}
          {/* <>
                    <Form.Section>
                        <Row>
                            <Col md={6} className="mb-2 mb-md-0">
                                <Input title="Наименование ИП" required />
                            </Col>
                            <Col md={6} className="mb-2 mb-md-0">
                                <Input title="ОГРНИП" required />
                            </Col>
                        </Row>
                    </Form.Section>
                </> */}

          <Separator className="my-3" />

          {/* Тип доверителя: Юридическое лицо */}
          {/* Сведения о лице, действующем без доверенности */}
          <>
            <Subtitle>Сведения о лице, действующем без доверенности</Subtitle>

            {/* Лицо, действующее без доверенности */}
            <Form.Section>
              <Form.Fieldset>
                <Form.Title>Лицо, действующее без доверенности</Form.Title>
              </Form.Fieldset>
              {/* <Radio.Group name="noAttorneyType" value="1" component={Row}>
                                <Col xs="auto" className="mb-2 mb-md-0">
                                    <Radio value="1" label="Юридическое лицо" />
                                </Col>
                                <Col xs="auto">
                                    <Radio value="2" label="Физическое лицо" />
                                </Col>
                            </Radio.Group> */}
            </Form.Section>

            {/* Лицо без доверенности: Юридическое лицо */}
            <Form.Section>
              <Input title="Наименование организации" required />
            </Form.Section>
            <Form.Section>
              <Row>
                <Col md={4} className="mb-2 mb-md-0">
                  <Input title="ИНН" required />
                </Col>
                <Col md={4} className="mb-2 mb-md-0">
                  <Input title="КПП" required />
                </Col>
                <Col md={4}>
                  <Input title="ОГРН" required />
                </Col>
              </Row>
            </Form.Section>
            <Form.Section>
              <Select title="Регион" items={[]} required />
            </Form.Section>

            <Separator className="my-3" />

            <Subtitle>Сведения о лице, действующем без доверенности</Subtitle>

            <Form.Section>
              <Row>
                <Col md={6} className="mb-2 mb-md-0">
                  <Input title="Фамилия" required />
                </Col>
                <Col md={6}>
                  <Input title="Имя" required />
                </Col>
              </Row>
            </Form.Section>
            <Form.Section>
              <Row>
                <Col md={6} className="mb-2 mb-md-0">
                  <Input title="Отчество" required />
                </Col>
                <Col md={6}>
                  <DateInput
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
                  <Input title="СНИЛС" required />
                </Col>
              </Row>
            </Form.Section>

            {/* Лицо без доверенности: Физическое лицо */}
            {/* <Form.Section>
                        <Row>
                            <Col md={6} className="mb-2 mb-md-0">
                                <Input title="Фамилия" required />
                            </Col>
                            <Col md={6}>
                                <Input title="Имя" required />
                            </Col>
                        </Row>
                    </Form.Section>
                    <Form.Section>
                        <Row>
                            <Col md={6} className="mb-2 mb-md-0">
                                <Input title="Отчество" required />
                            </Col>
                            <Col md={6}>
                                <DateInput
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
                                <Input title="СНИЛС" required />
                            </Col>
                            <Col md={6}>
                                <Input title="ИНН" required />
                            </Col>
                        </Row>
                    </Form.Section> */}
          </>

          {/* Тип доверителя: Индивидуальный предприниматель */}
          {/* Сведения о подписанте */}
          {/* <>
                    <Form.Section>
                        <Row>
                            <Col md={6} className="mb-2 mb-md-0">
                                <Input title="Фамилия" required />
                            </Col>
                            <Col md={6}>
                                <Input title="Имя" required />
                            </Col>
                        </Row>
                    </Form.Section>
                    <Form.Section>
                        <Row>
                            <Col md={6} className="mb-2 mb-md-0">
                                <Input title="Отчество" required />
                            </Col>
                            <Col md={6}>
                                <DateInput
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
                                <Input title="СНИЛС" required />
                            </Col>
                            <Col md={6}>
                                <Input title="ИНН" required />
                            </Col>
                        </Row>
                    </Form.Section>
                </> */}
        </Card>

        <Card>
          <Subtitle>Сведения о представителе</Subtitle>

          <Form.Section>
            <Row>
              <Col md={6} className="mb-2 mb-md-0">
                <Input title="ФИО" required />
              </Col>
              <Col md={6}>
                <DateInput
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
                <Input title="СНИЛС" required />
              </Col>
              <Col md={6}>
                <Input title="ИНН" required />
              </Col>
            </Row>
          </Form.Section>
          <Form.Section>
            <Select title="Вид документа" items={[]} required />
          </Form.Section>
          <Form.Section>
            <Row>
              <Col md={6} className="mb-2 mb-md-0">
                <Input title="Серия и номер документа" required />
              </Col>
              <Col md={6}>
                <DateInput
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
        </Card>
        <Card>
          <Subtitle>Сведения о полномочиях</Subtitle>
          <Paragraph>
            Подписание кадровых документов от лица работодателя
          </Paragraph>
        </Card>
      </VStack>

      <GroupContainer>
        <Button type="submit">Сохранить</Button>
        <Button variant={ButtonVariant.Secondary}>Отменить</Button>
      </GroupContainer>
    </Form>
  );
};
