// todo: place to components ???

import { Card } from "../components/Card";
import { Title } from "../components/Text";
import { VStack } from "../components/Stack";

import { MainWithStickySidebar as Layout } from "./MainWithStickySidebar";

export default {
    title: "uikit/LayoutStickySidebar",
};

export const Base = () => {
    return (
        <>
            <Title>Заголовок страницы</Title>

            <div className="row">
                <Layout>
                    <Layout.Main>
                        <VStack gap={2}>
                            {[...Array(5).keys()].map(() => (
                                <Card>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus tenetur nostrum
                                    asperiores enim amet nesciunt labore beatae nam ullam corporis qui, et possimus odit
                                    saepe vitae odio earum magnam, aliquam error corrupti quae suscipit sequi ut?
                                    Asperiores ea iusto nemo facilis architecto magni ratione quis similique rerum
                                    quasi, distinctio dolore consequuntur? Dicta voluptates cumque accusantium id
                                    officia natus laborum dolores eos? Quibusdam sed nemo omnis veniam fuga, ullam
                                    eligendi temporibus dolore dignissimos necessitatibus saepe laborum, eos distinctio
                                    repellat. Architecto laboriosam autem natus dolorem vero nemo ipsa voluptatum
                                    quibusdam nobis ad eius optio, necessitatibus laborum alias! Eum illum ex at
                                </Card>
                            ))}
                        </VStack>
                    </Layout.Main>
                    <Layout.Aside>
                        <Card theme="muted">
                            <div className="status status_muted mb-1">Уволен</div>

                            <time className=" date-preview d-block mb-2">Обновлено: 23.23.23</time>

                            <Card.Footer>
                                <button
                                    data-action="restore"
                                    className="button button_icontext button_plain"
                                    type="button"
                                >
                                    <svg className="icon button__icon">
                                        <use href="uikit/icon/icons.svg#rotation"></use>
                                    </svg>
                                    Восстановить сотрудника
                                </button>
                            </Card.Footer>
                        </Card>
                    </Layout.Aside>
                </Layout>
            </div>
        </>
    );
};
