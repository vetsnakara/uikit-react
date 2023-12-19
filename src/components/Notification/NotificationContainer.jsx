import { useCallback, useEffect, useState } from "react";

import { Portal } from "../Portal";
import { Notification } from "./Notification";

// todo: title icon
// todo: content markup
// todo: removeAll
// todo: add icon

// todo: как удобно передавать настройки??? (see toastify)

// {% set classNameName = (type=="info")? "accent" : type  %}
// {% set iconAttr = (type=="success")? type : "question" %}

const Type = {
    Accent: "accent",
    Warning: "warning",
    Danger: "danger",
    Success: "success",
};

const fn = {};

const show = (data, { type = Type.Accent } = {}) => {
    const { addItem, removeItem } = fn;

    const id = new Date().getTime();
    const item = { id, title: id, type };

    addItem(item);

    // todo: removeTimeout
    // setTimeout(() => removeItem(id), 5000); // todo: options
};

export const notification = {
    info: (data) => show(data, { type: Type.Accent }),
    success: (data) => show(data, { type: Type.Success }),
    danger: (data) => show(data, { type: Type.Danger }),
    warning: (data) => show(data, { type: Type.Warning }),
};

export const NotificationContainer = ({ autoClose = true, element }) => {
    const [items, setItems] = useState([]);

    const addItem = useCallback((item) => {
        setItems((items) => [item, ...items]);
    }, []);

    const removeItem = useCallback((id) => {
        setItems((items) => items.filter((item) => item.id !== id), []);
    });

    const handleClose = useCallback((event) => {
        const { id } = $(event.target).data();
        // todo: removeTimeout if any
        if (id) removeItem(id);
    }, []);

    useEffect(() => {
        fn.addItem = addItem;
        fn.removeItem = removeItem;
    }, []);

    return (
        <Portal element={element}>
            <div className="notifications" onClick={handleClose}>
                {items.map((item) => (
                    <Notification key={item.id} {...item} onClose={handleClose} />
                ))}
            </div>
        </Portal>
    );
};
