import cn from "classnames";
import { Icon } from "@/components";

export const DropdownItemType = {
    Button: "button",
    Link: "link",
};

const itemClass = "dropdown-item";

export const DropdownItem = (props) => {
    const { type = DropdownItemType.Button, text, icon, href, className, onClick, ...otherProps } = props;

    const content = (
        <>
            {icon && <Icon name={icon} />}
            <span className="dropdown-item__text">{text}</span>
        </>
    );

    const classes = {
        [DropdownItemType.Button]: cn(itemClass, className),
        [DropdownItemType.Link]: cn(itemClass, "link", "content_muted", className),
    };

    const element = {
        [DropdownItemType.Button]: (
            <button className={classes[type]} onClick={onClick} {...otherProps}>
                {content}
            </button>
        ),
        [DropdownItemType.Link]: (
            <a href={href} className={classes[type]} {...otherProps}>
                {content}
            </a>
        ),
    };

    return element[type];
};
