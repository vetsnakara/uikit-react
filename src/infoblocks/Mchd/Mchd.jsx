import { Main } from "./components/Main";
import { Sidebar } from "./components/Sidebar";
import { RemoveModal, RevokeModal, SignModal } from "./components/modals";
import { useAppState } from "./context";

import { MainWithStickySidebarLayout as Layout, Row, Title } from "@/components";

// todo: icon are not visible now
// todo: переписать на react-query

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
