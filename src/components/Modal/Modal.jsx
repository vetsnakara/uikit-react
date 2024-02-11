import cn from "classnames";
import { memo, useEffect, useRef, useState } from "react";

import { Portal } from "../Portal";

export const ModalVariant = {
    Modal: "modal",
    Dialog: "dialog",
};

// const ModalType = {
//     Alert: "alert",
//     Confirm: "confirm",
// };

const ModalEvent = {
    Hide: "hide.bs.modal",
};

const DefaultHeaderContent = ({ title, icon, disabled }) => {
    return (
        <>
            <div className="modal__header-box">
                {icon && (
                    <svg className="icon icon_brand modal__header-icon">
                        <use href={`/assets/redesign-theme/uikit/icon/icons.svg#${icon}`} />
                    </svg>
                )}
                <h2 className="modal__title">{title}</h2>
            </div>
            <button type="button" disabled={disabled} className="modal__close" data-dismiss="modal"></button>
        </>
    );
};

const DefaultFooterContent = ({ confirmLabel = "OK", cancelLabel = "Отменить", disabled, onConfirm }) => {
    return (
        <div className="group-container">
            <button
                type="button"
                disabled={disabled}
                className="button button_secondary group-container__item"
                data-dismiss="modal"
                title="Закрыть диалоговое окно"
            >
                {cancelLabel}
            </button>
            <button type="button" disabled={disabled} className="button group-container__item" onClick={onConfirm}>
                {confirmLabel}
            </button>
        </div>
    );
};

const renderHeader = (props) => {
    const { hasHeader = true } = props;

    return hasHeader ? (
        <div className="modal__header">
            <DefaultHeaderContent {...props} />
        </div>
    ) : null;
};

const renderFooter = (props) => {
    const { hasFooter = true } = props;

    return hasFooter ? (
        <div className="modal__footer">
            <DefaultFooterContent {...props} />
        </div>
    ) : null;
};

const renderBody = (props) => {
    const { children } = props;

    return <div className="modal__body">{children}</div>;
};

export const Modal = memo((props) => {
    const { open, onClose, variant = ModalVariant.Modal, element, lazy = true } = props;

    const ref = useRef();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!isMounted && open) {
            setIsMounted(true);
        }
    }, [open]);

    useEffect(() => {
        if (!ref.current) return;

        const $modal = $(ref.current);

        if (open) {
            $modal.on(ModalEvent.Hide, () => onClose?.());
        }

        $modal.modal(open ? "show" : "hide");

        return () => $modal.off(ModalEvent.Hide);
    }, [open, isMounted]);

    const modalClassNames = cn("modal", { [`modal_dialog`]: variant === ModalVariant.Dialog });

    if (lazy && !isMounted) return null;

    return (
        <Portal element={element}>
            <div ref={ref} className={modalClassNames} tabIndex="-1">
                <div className="modal__content">
                    {renderHeader(props)}
                    {renderBody(props)}
                    {renderFooter(props)}
                </div>
            </div>
        </Portal>
    );
});

export const Dialog = () => {};
export const Alert = () => {};
export const Confirm = () => {};
