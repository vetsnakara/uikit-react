import { useEffect } from "react";

import { Row, Title } from "@uikit/components";
import { MainWithStickySidebar as Layout } from "@uikit/layout/MainWithStickySidebar";

import { MchdForm } from "./components/MchdForm/MchdForm";
// import { RemoveModal, RevokeModal, SignModal } from "./components/modals";
import { Sidebar } from "./components/Sidebar";

// todo: icon are not visible now

export const MchdConstructor = () => {
    // const { extensionNumber } = useAppState();

    useEffect(() => {
        // todo: create own hook???
        // todo: use ref
        // initNavigation();
    }, []);

    return (
        <>
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
        </>
    );
};
