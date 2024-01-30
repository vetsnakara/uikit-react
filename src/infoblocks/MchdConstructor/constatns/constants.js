import { StatusType } from "../../../components/Status";

export const DATE_FORMAT = "DD.MM.YYYY";

export const Status = {
    Draft: "DRAFT",
    Signed: "SIGNED",
    Revoked: "WITHDRAWN",
};

export const UserRole = {
    Owner: "OWNER",
    Manager: "MANAGER",
};

export const Action = {
    SIGN: "SIGN",
    DELETE: "DELETE",
    DOWNLOAD: "DOWNLOAD",
    REVOKE: "REVOKE",
    COPY: "COPY",
};

// todo: is needed?
export const AppAction = {
    ..._.pick(Action, ["SIGN", "DELETE", "REVOKE"]),
    SET_STATUS: "SET_STATUS",
};

const DropdownAction = {
    [Action.COPY]: {
        name: "Создать копию",
    },
    [Action.REVOKE]: {
        name: "Отозвать",
    },
    [Action.DELETE]: {
        name: "Удалить",
    },
};

const statusAttrs = {
    [Status.Draft]: {
        name: "Создана",
        statusType: null,
        actions: {
            [UserRole.Owner]: [Action.SIGN, Action.DELETE, Action.COPY, Action.DOWNLOAD],
            [UserRole.Manager]: [Action.DOWNLOAD],
        },
    },
    [Status.Signed]: {
        name: "Подписана",
        statusType: StatusType.Success,
        actions: {
            [UserRole.Owner]: [Action.REVOKE, Action.COPY, Action.DOWNLOAD],
            [UserRole.Manager]: [Action.DOWNLOAD],
        },
    },
    [Status.Revoked]: {
        name: "Отозвана",
        statusType: StatusType.Muted,
        actions: {
            [UserRole.Owner]: [Action.COPY],
            [UserRole.Manager]: [],
        },
    },
};

export const getStatusAttrs = ({ status, userRole }) => {
    const attrs = statusAttrs[status];

    const {
        actions: { [userRole]: userActions },
    } = attrs;

    const actions = [];
    const dropdownItems = [];

    userActions.forEach((action) => {
        if (action in DropdownAction) {
            const dropdownAction = DropdownAction[action];
            dropdownItems.push({ id: action, text: dropdownAction.name });
        }

        actions.push(action);
    });

    return {
        ...attrs,
        actions,
        dropdownItems,
    };
};

export const Notification = {
    Success: {
        [Action.SIGN]: { title: "Доверенность подписана" },
        [Action.REVOKE]: { title: "Доверенность отозвана" },
        [Action.REMOVE]: { title: "Доверенность удалена" },
    },
    Failure: {
        [Action.SIGN]: { title: "Ошибка подписания доверенности" },
        [Action.REVOKE]: { title: "Ошибка отзыва доверенности" },
        [Action.REMOVE]: { title: "Ошибка удаления доверенности" },
        [Action.DOWNLOAD]: { title: "Ошибка скачивания доверенности" },
    },
};

/**
 * Тип доверителя
 */
export const PrincipalType = {
    LegalEntityPrincipal: "1", // юр. лицо
    IndividualEntrepreneurPrincipal: "3", // инд. предприниматель
};

/**
 * Наименование доверителя
 */
export const PrincipalName = {
    [PrincipalType.LegalEntityPrincipal]: "Юридическое лицо",
    [PrincipalType.IndividualEntrepreneurPrincipal]: "Индивидуальный предприниматель",
};

/**
 * Тип лицa, действующего без доверенности
 */
export const LegalEntityPrincipalType = {
    LegalEntityPerson: "1", // юр. лицо
    Person: "2", // физ. лицо
};

/**
 * Наименование лицa, действующего без доверенности
 */
export const LegalEntityPrincipalName = {
    [LegalEntityPrincipalType.LegalEntityPerson]: "Юридическое лицо",
    [LegalEntityPrincipalType.Person]: "Физическое лицо",
};

/**
 * Вид документа
 */
export const DocKind = {
    // Паспорт гражданина РФ
    RussianCitizenPassport: "21",
    // Военный билет
    MilitaryTicket: "07",
    // Паспорт иностранного гражданина
    ForeignCitizenPassport: "10",
    //  Загранпаспорт гражданина Российской Федерации
    InternationalPassportOfCitizenOfRussianFederation: "22",
};
