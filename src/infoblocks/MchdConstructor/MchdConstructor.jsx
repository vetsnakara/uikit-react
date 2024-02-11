import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { yupResolver } from "@hookform/resolvers/yup";

import * as ReactHookForm from "react-hook-form";

import { mockState as defaultValues } from "./constatns/mockState";
import { DataProvider } from "./context/DataContext";

import { MchdForm } from "./components/MchdForm/MchdForm";
import { Sidebar } from "./components/Sidebar";
// import { RemoveModal, RevokeModal, SignModal } from "./components/modals";

// todo: icon are not visible now

const queryClient = new QueryClient();
const { useForm, FormProvider } = initLib({ ReactHookForm });

import { schema } from "./schema";

import { documentTypes } from "./constatns/documentTypes";
import { managers } from "./constatns/managers";
import { regions } from "./constatns/regions";

import { MainWithStickySidebarLayout as Layout, Row, Title } from "@/components";
import { initLib } from "@/utils";

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

// extract component providers
export const MchdConstructor = () => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(schema),
        shouldFocusError: false, // не со всеми контролами работает корректно (DateInput)
    });

    // useEffect(() => {
    //     // todo: create own hook???
    //     // todo: use ref
    //     // initNavigation();
    // }, []);

    return (
        <FormProvider {...methods}>
            <QueryClientProvider client={queryClient}>
                <DataProvider data={{ selectItems }}>
                    <Title>Создание доверенности</Title>

                    <Row>
                        <Layout>
                            <Layout.Main>
                                <MchdForm />
                            </Layout.Main>
                            <Layout.Aside>
                                <Sidebar />
                            </Layout.Aside>
                        </Layout>
                    </Row>
                </DataProvider>
            </QueryClientProvider>
        </FormProvider>
    );
};
