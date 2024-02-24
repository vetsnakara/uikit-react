import { MainWithStickySidebarLayout as Layout } from "./MainWithStickySidebarLayout";

import { Card, Title, VStack, Icon } from "@/components";

export default {
    title: "layout/LayoutStickySidebar",
    tags: ["autodocs"],
};

export const Base = () => {
    return (
        <>
            <Title>Заголовок страницы</Title>

            <div className="row">
                <Layout>
                    <Layout.Main>
                        <VStack gap={2}>
                            {[...Array(5).keys()].map((index) => (
                                <Card key={index}>
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
                                    <Icon name="rotation" className="button__icon" />
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
