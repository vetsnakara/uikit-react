import { useEffect } from "react";

import { MainWithStickySidebar as Layout } from "@uikit/layout/MainWithStickySidebar";
import { Title, Row } from "@uikit/components";

import { Main } from "./components/Main";
import { Sidebar } from "./components/Sidebar";
import { useAppState } from "./context";
import { SignModal, RemoveModal, RevokeModal } from "./components/modals";
import { initNavigation } from "./navigation";

// todo: icon are not visible now

export const MchdConstructor = () => {
    const { extensionNumber } = useAppState();

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
                        <Main />
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
