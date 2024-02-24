import cn from "classnames";

import { Icon } from "@/components";

export const Notification = (props) => {
    const { id, title, content, icon, visibleCloseButton = true, type } = props;

    const classNames = cn("notifications__card", { [`notifications__card_${type}`]: type });

    return (
        <div className={classNames}>
            {icon && (
                <div className="notifications__card-icon">
                    <Icon id="question" name={icon} className="icon_in-text" />
                </div>
            )}

            <div className="notifications__card-title">{title}</div>

            {content && <div className="notifications__card-content">{content}</div>}

            {visibleCloseButton && (
                <button type="button" data-id={id} className="button-close notifications__card-close">
                    <Icon name="close" size="m" className="button__icon" />
                </button>
            )}
        </div>
    );
};
