import { useEffect } from "react";

import { Row, Title } from "@uikit/components";
import { MainWithStickySidebar as Layout } from "@uikit/layout/MainWithStickySidebar";

import { Main } from "./components/Main";
import { RemoveModal, RevokeModal, SignModal } from "./components/modals";

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
                        <Main /> {/* rename ro MchdForm */}
                    </Layout.Main>
                    <Layout.Aside>
                        {/* <Sidebar /> */}
                        <nav className="navigation">
                            <button
                                className="navigation__preview"
                                aria-expanded="false"
                                role="combobox"
                                aria-haspopup="listbox"
                            >
                                Сведения о доверенности
                            </button>
                            <div className="navigation__list">
                                <a href="#chapter-1" className="navigation__item navigation__item_active">
                                    Сведения о доверенности
                                </a>
                                <a href="#chapter-2" className="navigation__item">
                                    Сведения о доверителе
                                </a>
                                <a href="#chapter-3" className="navigation__item">
                                    Сведения о представителе
                                </a>
                                <a href="#chapter-4" className="navigation__item">
                                    Сведения о полномочиях
                                </a>
                            </div>
                        </nav>
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
