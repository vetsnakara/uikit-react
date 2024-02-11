import { createContext, useContext, useReducer } from "react";

import {
    LegalEntityPrincipalName,
    LegalEntityPrincipalType,
    PrincipalName,
    PrincipalType,
    getStatusAttrs,
} from "./constants";
import { reducer } from "./reducer";
import { UIProvider } from "./uiContext";
import { formatDate } from "./utils";

const StateContext = createContext();
const DispatchContext = createContext();

export const Provider = ({ data, children }) => {
    const [state, dispatch] = useReducer(reducer, data, mapData);

    return (
        <UIProvider>
            <StateContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
            </StateContext.Provider>
        </UIProvider>
    );
};

export const useAppState = () => useContext(StateContext);

export const useAppDispatch = () => useContext(DispatchContext);

// todo: check rerenders (sidebar, main)
// todo: mv to separate file
// todo: use functions to get blocks of data

export const setSidebarState = (state) => {
    _.extend(state, {
        sidebar: {
            statusAttrs: getStatusAttrs(_.pick(state, ["status", "userRole"])),
        },
    });
};

const mapData = ({
    userRole,
    mchd: {
        status,
        extensionNumber,
        type: principalType,
        created,
        validity,
        legalEntityPrincipal,
        individualEntrepreneurPrincipal,
        representative,
    },
}) => {
    const isLegalEntityPrincipal = principalType === PrincipalType.LegalEntityPrincipal;
    const isLegalEntityPerson =
        isLegalEntityPrincipal && legalEntityPrincipal.type === LegalEntityPrincipalType.LegalEntityPerson;
    const isPerson = isLegalEntityPrincipal && legalEntityPrincipal.type === LegalEntityPrincipalType.Person;

    const isIndividualEntrepreneurPrincipal = principalType === PrincipalType.IndividualEntrepreneurPrincipal;

    const state = {
        status,
        userRole,
        extensionNumber,
        sections: [
            {
                title: "Сведения о доверенности",
                items: [
                    { term: "Тип доверенности:", desc: "Основная доверенность" },
                    { term: "Внутренний номер:", desc: extensionNumber },
                    { term: "Дата выдачи доверенности:", desc: formatDate(created) },
                    { term: "Дата окончания доверенности:", desc: formatDate(validity) },
                ],
            },
            {
                title: "Сведения о доверителе",
                items: [
                    { term: "Тип доверителя:", desc: PrincipalName[principalType] },

                    // Тип доверителя: Юридическое лицо
                    ...(isLegalEntityPrincipal
                        ? [
                              {
                                  term: "Наименование организации:",
                                  desc: (
                                      // todo: create link component
                                      <a href="#" className="link">
                                          {legalEntityPrincipal.companyName}
                                      </a>
                                  ),
                              },
                              { term: "ИНН:", desc: legalEntityPrincipal.inn },
                              { term: "КПП:", desc: legalEntityPrincipal.kpp },
                              { term: "ОГРН:", desc: legalEntityPrincipal.ogrn },
                              { term: "Регион:", desc: legalEntityPrincipal.region }, // todo: map region
                          ]
                        : []),

                    // Тип доверителя: Индивидуальный предприниматель
                    ...(isIndividualEntrepreneurPrincipal
                        ? [
                              { term: "Наименование ИП:", desc: individualEntrepreneurPrincipal.companyName },
                              { term: "ОГРНИП:", desc: individualEntrepreneurPrincipal.ogrn },
                          ]
                        : []),
                ],
                subsections: [
                    // Тип доверителя: Юридическое лицо
                    ...(isLegalEntityPrincipal
                        ? [
                              {
                                  title: "Сведения о лице, действующем без доверенности",
                                  items: [
                                      {
                                          term: "Лицо, действующее без доверенности:",
                                          desc: LegalEntityPrincipalName[legalEntityPrincipal.type],
                                      },
                                      // Юридическое лицо
                                      ...(isLegalEntityPerson
                                          ? [
                                                {
                                                    term: "Наименование организации:",
                                                    desc: (
                                                        <a href="#" className="link">
                                                            {legalEntityPrincipal.legalEntityPerson.companyName}
                                                        </a>
                                                    ),
                                                },
                                                {
                                                    term: "ИНН:",
                                                    desc: legalEntityPrincipal.legalEntityPerson.inn,
                                                },
                                                {
                                                    term: "КПП:",
                                                    desc: legalEntityPrincipal.legalEntityPerson.kpp,
                                                },
                                                {
                                                    term: "ОГРН:",
                                                    desc: legalEntityPrincipal.legalEntityPerson.ogrn,
                                                },
                                                {
                                                    term: "Регион:",
                                                    desc: legalEntityPrincipal.legalEntityPerson.region,
                                                },
                                            ]
                                          : []),
                                      // Физическое лицо
                                      ...(isPerson
                                          ? [
                                                { term: "ФИО:", desc: legalEntityPrincipal.person.firstName }, //!
                                                {
                                                    term: "Дата рождения:",
                                                    desc: formatDate(legalEntityPrincipal.person.birthday),
                                                },
                                                { term: "СНИЛС:", desc: legalEntityPrincipal.person.snils },
                                                { term: "ИНН:", desc: legalEntityPrincipal.person.inn },
                                            ]
                                          : []),
                                  ],
                              },

                              // Юридическое лицо
                              ...(isLegalEntityPerson
                                  ? [
                                        {
                                            title: "Сведения о руководителе организации",
                                            items: [
                                                {
                                                    term: "ФИО:",
                                                    desc: legalEntityPrincipal.legalEntityPerson.firstName,
                                                }, //!
                                                {
                                                    term: "Дата рожденя:",
                                                    desc: formatDate(legalEntityPrincipal.legalEntityPerson.birthday),
                                                },
                                                { term: "СНИЛС:", desc: legalEntityPrincipal.legalEntityPerson.snils },
                                                { term: "ИНН:", desc: legalEntityPrincipal.legalEntityPerson.inn },
                                            ],
                                        },
                                    ]
                                  : []),
                          ]
                        : []),

                    // Тип доверителя: Индивидуальный предприниматель
                    ...(isIndividualEntrepreneurPrincipal
                        ? [
                              {
                                  title: "Сведения о подписанте",
                                  items: [
                                      { term: "ФИО:", desc: individualEntrepreneurPrincipal.firstName }, //!
                                      {
                                          term: "Дата рождения:",
                                          desc: formatDate(individualEntrepreneurPrincipal.birthday),
                                      },
                                      { term: "СНИЛС:", desc: formatDate(individualEntrepreneurPrincipal.snils) },
                                      { term: "ИНН:", desc: formatDate(individualEntrepreneurPrincipal.inn) },
                                  ],
                              },
                          ]
                        : []),
                ],
            },
            {
                title: "Сведения о представителе",
                items: [
                    { term: "ФИО:", desc: representative.firstName }, //!
                    { term: "Дата рождения:", desc: formatDate(representative.birthday) },
                    { term: "СНИЛС:", desc: representative.snils },
                    { term: "ИНН:", desc: representative.inn },
                    { term: "Вид документа:", desc: representative.documentType }, //!
                    { term: "Серия и номер документа:", desc: representative.seriesAndNumber },
                    { term: "Дата выдачи документа:", desc: formatDate(representative.created) },
                    { term: "Наименование органа, выдавшего документ:", desc: representative.authorityDocument },
                    {
                        term: "Код подразделения органа, выдавшего документ:",
                        desc: representative.authorityCodeDocument,
                    },
                    {
                        term: "Дата истечения срока действия документа, удостоверяющего личность:",
                        desc: formatDate(representative.validity),
                    },
                ],
            },
        ],
    };

    setSidebarState(state);

    return state;
};
