// !!!
/* eslint-disable no-undef */

import { get } from "react-hook-form";

import { DATE_FORMAT, LegalEntityPrincipalType, PrincipalType } from "./constatns/constants";

import { isAnySymbolRegex, validateSnils } from "./utils";

const IS_VALUE_EXIST = "IS_VALUE_EXIST";
const IS_DATE_VALID = "IS_DATE_VALID";
const IS_INN_VALID = "IS_INN_VALID";
const IS_KPP_VALID = "IS_KPP_VALID";
const IS_OGRN_VALID = "IS_OGRN_VALID";
const IS_OGRNIP_VALID = "IS_OGRNIP_VALID";
const IS_SNILS_VALID = "IS_SNILS_VALID";
const IS_DEPARTMENT_CODE_VALID = "IS_DEPARTMENT_CODE_VALID ";
const IS_DOCUMENT_CODE_VALID = "IS_DOCUMENT_CODE_VALID ";
const IS_DATE_SAME_OR_BEFORE_TODAY = "IS_DATE_SAME_OR_BEFORE_CURRENT_DATE";
const IS_DATE_SAME_OR_BEFORE_END_DATE = "IS_DATE_SAME_OR_BEFORE_END_DATE";
const IS_DATE_SAME_OR_AFTER_BEGIN_DATE = "IS_DATE_SAME_OR_AFTER_BEGIN_DATE ";
const IS_DATE_AGE_VALID = "IS_DATE_AGE_VALID ";
const IS_MANAGER_AUTORIZED = "IS_MANAGER_AUTORIZED ";

const msg = {
    [IS_VALUE_EXIST]: "Поле обязательно для заполнения",
    [IS_DATE_VALID]: "Некорректная дата",
    [IS_INN_VALID]: "Указан некорректный ИНН",
    [IS_KPP_VALID]: "Указан некорректный КПП",
    [IS_OGRN_VALID]: "Указан некорректный ОГРН",
    [IS_OGRNIP_VALID]: "Указан некорректный ОГРНИП",
    [IS_SNILS_VALID]: "Указан некорректный СНИЛС",
    [IS_DEPARTMENT_CODE_VALID]: "Указан некорректный Код подразделения",
    [IS_DOCUMENT_CODE_VALID]: "Указаны некорректные Серия и номер документа",
    [IS_DATE_SAME_OR_BEFORE_TODAY]: "Дата выдачи не может принимать значение даты, которая еще не наступила",
    [IS_DATE_SAME_OR_BEFORE_END_DATE]:
        "Дата выдачи доверенности должна быть ранее даты окончания действия доверенности",
    [IS_DATE_SAME_OR_AFTER_BEGIN_DATE]:
        "Дата окончания действия доверенности должна быть позднее даты выдачи доверенности",
    [IS_DATE_AGE_VALID]: "Возраст представителя младше 16 лет. Уточните дату рождения",
    [IS_MANAGER_AUTORIZED]: "Выбранному менеджеру нужно зайти в ЛК Работодателя.",
};

const MaskType = {
    DATE: "date",
    INN_COMPANY: "innCompany",
    INN_PERSON: "innPerson",
    KPP: "kpp",
    OGRN: "ogrn",
    OGRNIP: "ogrnip",
    SNILS: "snils",
    DEPARTMENT_CODE: "departmentCode",
    MAX: "max",
};

const { DATE, INN_COMPANY, INN_PERSON, KPP, OGRN, SNILS, OGRNIP, MAX, DEPARTMENT_CODE } = MaskType;

export const Regexp = {
    [INN_COMPANY]: "^([0-9]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{8}$",
    [INN_PERSON]: "^([0-9]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{10}$",
    [KPP]: "^([0-9]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{7}$",
    [OGRN]: "^[0-9]{13}$",
    [OGRNIP]: "^[0-9]{15}$",
    [SNILS]: "^[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{2}|[0-9]{3}-[0-9]{3}-[0-9]{3} [0-9]{2}$",
    [DEPARTMENT_CODE]: "^.{7}$",
};

const PLACEHOLDER_SYMBOL = "_";

const Placeholder = {
    [INN_PERSON]: "ИНН",
    [INN_COMPANY]: "ИНН",
    [KPP]: "КПП",
    [OGRN]: "ОГРН",
    [OGRNIP]: "ОГРН",
    [SNILS]: "СНИЛС",
};

const Mask = {
    [DATE]: {
        mask: "99.99.9999",
    },
    [INN_COMPANY]: {
        mask: "9{10}",
        placeholder: PLACEHOLDER_SYMBOL.repeat(10),
    },
    [INN_PERSON]: {
        mask: "9{12}",
        placeholder: PLACEHOLDER_SYMBOL.repeat(12),
    },
    [KPP]: {
        mask: "9{9}",
        placeholder: PLACEHOLDER_SYMBOL.repeat(9),
    },
    [OGRN]: {
        mask: "9{13}",
        placeholder: PLACEHOLDER_SYMBOL.repeat(13),
    },
    [OGRNIP]: {
        mask: "9{15}",
        placeholder: PLACEHOLDER_SYMBOL.repeat(15),
    },
    [SNILS]: {
        mask: "999-999-999 99",
        placeholder: PLACEHOLDER_SYMBOL.repeat(14),
    },
    [DEPARTMENT_CODE]: {
        regex: Regexp[DEPARTMENT_CODE],
        placeholder: PLACEHOLDER_SYMBOL.repeat(7),
    },
    [MAX]: (count) => ({
        maxLength: count,
    }),
};

yup.setLocale({
    mixed: {
        required: msg[IS_VALUE_EXIST],
    },
});

function addReactProps(ctx, props) {
    Object.assign(ctx, { _reactProps: { ...(ctx._reactProps ?? {}), ...props } });
}

yup.addMethod(yup.string, "isRequired", function () {
    addReactProps(this, { required: true });
    return this.required();
});

yup.addMethod(yup.string, "mask", function (maskOptions) {
    this.maskOptions = _.extend(this.maskOptions ?? {}, maskOptions);
    return this;
});

yup.addMethod(yup.string, "maskMaxCount", function (max) {
    const maskOptions = Mask[MAX](max);
    return this.mask(maskOptions);
});

yup.addMethod(yup.string, "innCompany", function isCompanyINN() {
    addReactProps(this, { placeholder: Placeholder[INN_COMPANY], maskOptions: Mask[INN_COMPANY] });
    return this.matches(new RegExp(Regexp[INN_COMPANY]), msg[IS_INN_VALID]);
});

yup.addMethod(yup.string, "innPerson", function isPersonINN() {
    addReactProps(this, { placeholder: Placeholder[INN_PERSON], maskOptions: Mask[INN_PERSON] });
    return this.matches(new RegExp(Regexp[INN_PERSON]), msg[IS_INN_VALID]);
});

yup.addMethod(yup.string, "kpp", function isKPP() {
    addReactProps(this, { placeholder: Placeholder[KPP], maskOptions: Mask[KPP] });
    return this.matches(new RegExp(Regexp[KPP]), msg[IS_KPP_VALID]);
});

yup.addMethod(yup.string, "ogrn", function isOGRN() {
    addReactProps(this, { placeholder: Placeholder[OGRN], maskOptions: Mask[OGRN] });
    return this.matches(new RegExp(Regexp[OGRN]), msg[IS_OGRN_VALID]);
});

yup.addMethod(yup.string, "ogrnip", function isOGRNIP() {
    addReactProps(this, { placeholder: Placeholder[OGRNIP], maskOptions: Mask[OGRNIP] });
    return this.matches(new RegExp(Regexp[OGRNIP]), msg[IS_OGRNIP_VALID]);
});

yup.addMethod(yup.string, "snils", function isSNILS() {
    addReactProps(this, { placeholder: Placeholder[SNILS], maskOptions: Mask[SNILS] });
    return this.test("snils", msg[IS_SNILS_VALID], (value) => {
        const isValidFormat = new RegExp(Regexp[SNILS]).test(value);
        return isValidFormat && validateSnils(value);
    });
});

yup.addMethod(yup.string, "departmentCode", function isDepartmentCode() {
    const regStr = Regexp[DEPARTMENT_CODE];
    this.isAnySymbolRegex = isAnySymbolRegex(regStr);
    return this.matches(new RegExp(regStr), msg[IS_DEPARTMENT_CODE_VALID]).mask(Mask[DEPARTMENT_CODE]).maskMaxCount(7);
});

yup.addMethod(yup.string, "docNumberCode", function isDocNumberCode(template) {
    // Проверка на соответствие регулярного выражения виду "^.{25}$"
    // Если соответствует, то при инициализации inputmask делаем autoUnmask: true,
    // чтобы символы плейсхолдера маски "_" не воспрнимались валидатором yup как валидные символы
    this.isAnySymbolRegex = isAnySymbolRegex(template);
    return this.matches(new RegExp(template), msg[IS_DOCUMENT_CODE_VALID]).mask({ regex: template });
});

// dates validation

yup.addMethod(yup.string, "validAge", function validAge() {
    return this.test("isAgeValid", msg[IS_DATE_AGE_VALID], (value) => isAgeValid(value));
});

yup.addMethod(yup.string, "validDate", function validDate() {
    return this.test("isDateValid", msg[IS_DATE_VALID], (value) => isDateValid(value)).mask(Mask[DATE]);
});

yup.addMethod(yup.string, "beforeToday", function beforeToday() {
    return this.test("isDateSameOrBeforeToday", msg[IS_DATE_SAME_OR_BEFORE_TODAY], (value) => {
        const mDate = moment(value, DATE_FORMAT, true);
        return isDateSameOrBefore(mDate);
    });
});

yup.addMethod(yup.string, "beforeAttorneyEnd", function beforeToday() {
    return this.test(
        "isDateSameOrBeforeEnd",
        msg[IS_DATE_SAME_OR_BEFORE_END_DATE],
        async (value, { options: { context } }) => {
            const {
                data: { attorneyDateEnd },
            } = context;

            const isDateEndValid = await attorneyDateEndBaseSchema.isValid(attorneyDateEnd);
            if (!isDateEndValid) return true;

            const mDateBegin = moment(value, DATE_FORMAT, true);
            const mDateEnd = moment(attorneyDateEnd, DATE_FORMAT, true);

            return isDateSameOrBefore(mDateBegin, mDateEnd);
        }
    );
});

yup.addMethod(yup.string, "isFilledFromManagerData", function () {
    return this.test("isFilledFromManagerData", msg[IS_VALUE_EXIST], async (value, ctx) => {
        const {
            options: { context },
            createError,
        } = ctx;

        const {
            data: { representativeId },
        } = context;

        if (value) return true;

        const message = representativeId ? msg[IS_MANAGER_AUTORIZED] : msg[IS_VALUE_EXIST];
        return createError({ message });
    });
});

yup.addMethod(yup.string, "afterAttorneyBegin", function beforeToday() {
    return this.test(
        "isDateSameOrAfterBegin",
        msg[IS_DATE_SAME_OR_AFTER_BEGIN_DATE],
        async (value, { options: { context } }) => {
            const {
                data: { attorneyDateBegin },
            } = context;

            const isDateBeginValid = await attorneyDateBeginBaseSchema.isValid(attorneyDateBegin);
            if (!isDateBeginValid) return true;

            const mDateBegin = moment(attorneyDateBegin, DATE_FORMAT, true);
            const mDateEnd = moment(value, DATE_FORMAT, true);

            return isDateSameOrAfter(mDateBegin, mDateEnd);
        }
    );
});

const { string } = yup;

const today = moment();

function isDateSameOrBefore(mDateBegin, mDateEnd = today) {
    const isSame = mDateBegin.isSame(mDateEnd, "day");
    const isBefore = mDateBegin.isBefore(mDateEnd, "day");
    return isSame || isBefore;
}

function isDateSameOrAfter(mDateBegin = today, mDateEnd) {
    const isSame = mDateBegin.isSame(mDateEnd, "day");
    const isAfter = mDateEnd.isAfter(mDateBegin, "day");
    return isSame || isAfter;
}

function isDateValid(value) {
    return moment(value, "DD.MM.YYYY", true).isValid();
}

function isAgeValid(value) {
    const castDate = moment(value, "DD.MM.YYYY");
    const age = moment().diff(castDate, "years", false);
    return age > 15 && age < 100;
}

export const attorneyDateBeginBaseSchema = string().isRequired(); //.validDate().beforeToday();
export const attorneyDateEndBaseSchema = string().isRequired(); //.validDate();

// Дефолтная схема валидации для поля "Серия и номер документа"
// Схема обновляется при изменении кода типа документа
// const defaultRepresentativeDocumentNumberSchema = {
//     representativeDocumentNumber: string().required(),
// };

const shapeCommon = {
    /**************************
     * Сведения о доверенности
     **************************/
    extensionNumber: string().isRequired(),
    // noInnerNumber: boolean(),
    created: attorneyDateBeginBaseSchema, //.beforeAttorneyEnd(),
    validity: attorneyDateEndBaseSchema, //.afterAttorneyBegin(),

    /************************
     * Сведения о доверителе
     ************************/
    // Тип доверителя
    type: string().isRequired(),
};

const shapeLegalEntityPerson = {
    companyName: string().isRequired(),
    inn: string().isRequired().innCompany(),
    kpp: string().isRequired().kpp(),
    ogrn: string().isRequired().ogrn(),
    // region: string().required(),

    // Сведение о руководителе организации
    lastName: string().isRequired(), // .maskMaxCount(200),
    firstName: string().isRequired(), // .maskMaxCount(200),
    middleName: string().isRequired(), // .maskMaxCount(200),
    birthday: string().isRequired(), // .validDate(),
    snils: string().isRequired().snils(),
    // innEIOUK: string().required().innPerson(),
};

const shapePerson = {
    lastName: string().required(), //.maskMaxCount(200),
    firstName: string().isRequired(), //.maskMaxCount(200),
    middleName: string().isRequired(), //.maskMaxCount(200),
    birthday: string().isRequired(), //.validDate(),
    snils: string().isRequired().snils(),
    inn: string().isRequired().innPerson(),
};

/**
 * Тип доверителя - Юридическое лицо
 */
const shapeLegalEntityPrincipal = {
    companyName: string().isRequired(),
    inn: string().isRequired().innCompany(),
    kpp: string().isRequired().kpp(),
    ogrn: string().isRequired().ogrn(),
    region: string().isRequired(),

    // Лицо, действующее без доверенности
    type: string(),
};

const shapeIndividualEntrepreneurPrincipal = {
    companyName: string().isRequired(),
    ogrn: string().isRequired().ogrnip(),

    // Сведения о подписанте
    lastName: string().isRequired(), //.maskMaxCount(200),
    firstName: string().isRequired(), //.maskMaxCount(200),
    middleName: string().isRequired(), //.maskMaxCount(200),
    birthday: string().isRequired(), //.validDate(),
    snils: string().isRequired().snils(),
    inn: string().isRequired().innPerson(),
};

const shapeRepresentative = {
    id: string().isRequired(),
    birthday: string() /*.isFilledFromManagerData()*/,
    // .validDate()
    // .validAge(),
    snils: string().isRequired().snils() /*.isFilledFromManagerData()*/,
    inn: string().isRequired().innPerson() /*.isFilledFromManagerData()*/,
    documentType: string().isRequired(),
    // ...defaultRepresentativeDocumentNumberSchema,
    created: string().isRequired(), //.validDate(),
    authorityDocument: string().isRequired(), //.maskMaxCount(4000)
    authorityCodeDocument: string() /*.departmentCode()*/
        .isRequired(),
    validity: string().required(), //.validDate(),
};

export const shape = {
    ...shapeCommon,
    legalEntityPrincipal: {
        ...shapeLegalEntityPrincipal,
        legalEntityPerson: shapeLegalEntityPerson,
        person: shapePerson,
    },
    individualEntrepreneurPrincipal: shapeIndividualEntrepreneurPrincipal,
    representative: shapeRepresentative,
};

export const schema = yup.object({
    ...shapeCommon,

    legalEntityPrincipal: yup.object().when("type", {
        is: PrincipalType.LegalEntityPrincipal,
        then: yup.object({
            ...shapeLegalEntityPrincipal,

            legalEntityPerson: yup.object().when("type", {
                is: LegalEntityPrincipalType.LegalEntityPerson,
                then: yup.object(shapeLegalEntityPerson),
            }),

            person: yup.object().when("type", {
                is: LegalEntityPrincipalType.Person,
                then: yup.object(shapePerson),
            }),
        }),
    }),

    individualEntrepreneurPrincipal: yup.object().when("type", {
        is: PrincipalType.IndividualEntrepreneurPrincipal,
        then: yup.object(shapeIndividualEntrepreneurPrincipal),
    }),

    representative: yup.object(shapeRepresentative),
});

/**
 * Получение схемы валидации отдельного поля
 * @param {*} name - Имя поля
 * @returns Схема валидации поля
 */
// export const getFieldSchema = (name) => shapeLegalEntityPerson[name];

/**
 * Настройка схемы валидации формы
 * @param {*} data - Объект текущих данных формы
 * @returns Схема валидации формы
 */
// export const buildSchema = (data, options = {}) => {
//     const { principalType, noAttorneyType } = data;
//     const { attorney, principal, principalCompany, noAttorneyCompany, noAttorneyPerson, principalPerson } = schema;

//     const shapeObj = {
//         ...attorney,
//         ...{
//             ...principal,
//             ...(principalType === PrincipalType.legalEntityPrincipal && {
//                 ...principalCompany,
//                 ...(noAttorneyType === LegalEntityPrincipalType.legalEntityPerson && noAttorneyCompany),
//                 ...(noAttorneyType === LegalEntityPrincipalType.person && noAttorneyPerson),
//             }),
//             ...(principalType === PrincipalType.individualEntrepreneurPrincipal && principalPerson),
//         },
//         ...buildRepresentativeSchema(schema.representative, data, options),
//     };

//     // update shapeLegalEntityPerson for separate fields validation
//     _.extend(shapeLegalEntityPerson, shapeObj);

//     return object().shapeLegalEntityPerson(shapeObj);
// };

/**
 * Настройка схемы валидации для блока "Сведения о представителе" в зависимости от кода выбранного вида документа
 * 1. Поле "Наименование органа, выдавшего документ" отображается если код выбранного Вида документа != 10
 * 2. Поле "Код подразделения органа, выдавшего документ" отображается если код выбранного Вида документа != 10
 * 3. Поле "Дата истечения срока действия документа, удостоверяющего личность" отображается если код выбранного Вида документа == 22
 *
 * @param {*} schema - правила валидации полей блока формы "Сведения о представителе"
 * @param {*} data - объект текущих данных формы
 * @returns Схема валидации для блока "Сведения о представителе"
 */
// const buildRepresentativeSchema = (schema, data, options) => {
//     const { representativeDocument } = data;

//     const isRepresentativeDocument = Boolean(representativeDocument);
//     const isForeignCitizenPassport = representativeDocument === DocKind.ForeignCitizenPassport;
//     const isInternationalPassportOfCitizenOfRussianFederation =
//         representativeDocument === DocKind.InternationalPassportOfCitizenOfRussianFederation;

//     const representativeDocumentNumberSchema = buildRepresentativeDocumentNumberSchema(data, options);

//     return {
//         ..._.omit(schema, [
//             "representativeDocumentOrganizationName",
//             "representativeDocumentOrganizationCode",
//             "representativeDocumentDateEnd",
//         ]),
//         ...representativeDocumentNumberSchema,
//         ...(isRepresentativeDocument &&
//             !isForeignCitizenPassport && {
//                 representativeDocumentOrganizationName: schema.representativeDocumentOrganizationName,
//             }),
//         ...(isRepresentativeDocument &&
//             !isForeignCitizenPassport && {
//                 representativeDocumentOrganizationCode: schema.representativeDocumentOrganizationCode,
//             }),
//         ...(isRepresentativeDocument &&
//             isInternationalPassportOfCitizenOfRussianFederation && {
//                 representativeDocumentDateEnd: schema.representativeDocumentDateEnd,
//             }),
//     };
// };

/**
 * Получение схемы валидации поля "Серия и номер документа"
 * @param {*} data - Текущие данные формы
 * @param {*} options - Дополнительные данные
 * @returns Схема валидации для поля
 */
// function buildRepresentativeDocumentNumberSchema(data, options) {
//     // список типов документов с шаблонами для маски и валидации
//     const { documentTypes } = options;

//     const defaultSchema = defaultRepresentativeDocumentNumberSchema;

//     const { representativeDocument } = data;
//     if (!representativeDocument) return defaultSchema;

//     const { template = null } = _.findWhere(documentTypes, { code: representativeDocument }) ?? {};
//     if (!template) return defaultSchema;

//     return {
//         representativeDocumentNumber: defaultSchema.representativeDocumentNumber.docNumberCode(template),
//     };
// }

export const buildData = ({ type, legalEntityPrincipal, individualEntrepreneurPrincipal, ...rest }) => ({
    type,
    ...(type === PrincipalType.LegalEntityPrincipal && {
        legalEntityPrincipal: buildLegalEntityPrincipal(legalEntityPrincipal),
    }),
    ...(type === PrincipalType.IndividualEntrepreneurPrincipal && { individualEntrepreneurPrincipal }),
    ...rest,
});

function buildLegalEntityPrincipal({ type, legalEntityPerson, person, ...rest }) {
    return {
        type,
        ...(type === LegalEntityPrincipalType.LegalEntityPerson && { legalEntityPerson }),
        ...(type === LegalEntityPrincipalType.Person && { person }),
        ...rest,
    };
}

export function getFieldConfig(name) {
    return get(shape, name)?._reactProps;
}
