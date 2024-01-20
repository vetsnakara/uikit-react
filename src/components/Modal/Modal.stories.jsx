import { useState } from "react";

import { Button } from "../Button";
import { DateInput } from "../DateInput";
import { Input } from "../Input";
import { Paragraph } from "../Text";

import { Modal as ModalComponent, ModalVariant } from "./Modal";

export default {
    title: "uikit/Modal",
    tags: ["autodocs"],
};

export const Dialog = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Click</Button>
            <ModalComponent
                variant={ModalVariant.Dialog}
                title="Диалоговое окно"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Paragraph>
                    Диалоговое окно - используется для коротких задач. Шапка и футер явно не выделены. Кнопки
                    располагаются справа. Кнопки действия для любых шаблонов всегда располагаются снаружи.
                    <Input title="Name" />
                    <DateInput title="Date" />
                </Paragraph>
            </ModalComponent>
        </>
    );
};

export const Modal = () => {
    const [open, setOpen] = useState(true);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Click</Button>
            <ModalComponent
                variant={ModalVariant.Modal}
                title="Модальное окно"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Paragraph>
                    Модальное окно - используется когда необходимо собрать данные от пользователя, путем заполнения
                    форм. Кнопки расположены слева. Имеет явно выраженную шапку и футер.
                </Paragraph>
            </ModalComponent>
        </>
    );
};
