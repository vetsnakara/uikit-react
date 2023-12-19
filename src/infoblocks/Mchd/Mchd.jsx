import { MainWithStickySidebar as Layout } from "@uikit/layout/MainWithStickySidebar";
import { Title, Row } from "@uikit/components";

import { Main } from "./components/Main";
import { Sidebar } from "./components/Sidebar";
import { useAppState } from "./context";
import { SignModal, RemoveModal, RevokeModal } from "./components/modals";

// todo: icon are not visible now

export const Mchd = () => {
    const { extensionNumber } = useAppState();

    return (
        <>
            <Title>Доверенность №{extensionNumber}</Title>

            <Row>
                <Layout>
                    <Layout.Main>
                        <Main />
                    </Layout.Main>
                    <Layout.Aside>
                        <Sidebar />
                    </Layout.Aside>
                </Layout>
            </Row>

            {/* todo: add conditions */}
            <SignModal />
            <RevokeModal />
            <RemoveModal />
        </>
    );
};
