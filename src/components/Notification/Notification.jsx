import cn from "classnames";

// todo: title icon

export const Notification = ({ id, title, content, icon, visibleCloseButton = true, type }) => {
    const classNames = cn("notifications__card", { [`notifications__card_${type}`]: type });

    return (
        <div className={classNames}>
            {icon && (
                <div className="notifications__card-icon">
                    <svg className="icon icon_in-text" id="question">
                        <use href={`/assets/redesign-theme/uikit/icon/icons.svg#${icon}`} />
                    </svg>
                </div>
            )}

            <div className="notifications__card-title">{title}</div>

            {content && <div className="notifications__card-content">{content}</div>}

            {visibleCloseButton && (
                <button type="button" data-id={id} className="button-close notifications__card-close">
                    <svg className="button__icon icon icon_m">
                        <use href="/assets/redesign-theme/uikit/icon/icons.svg#close" />
                    </svg>
                </button>
            )}
        </div>
    );
};
