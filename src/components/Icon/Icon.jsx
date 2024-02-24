import cn from "classnames";

// todo: add correct svg attributes type to jsdoc
// todo: & import('react').HTMLAttributes<HTMLDivElement>

/**
 * Icon
 *
 * @param {{
 *     name: string,
 *     size?: "xs" | "s" | "m" | "b" | "l" | "x3",
 *     color?: "brand" | "good" | "light" | "danger" | "warning" | "default" | "gray" | "blue" | "muted",
 *     className?: string
 * }} props
 */
export const Icon = (props) => {
    const { className, name, size, color, ...svgProps } = props;

    const classNames = cn("icon", className, {
        [`icon_${size}`]: size,
        [`icon_${color}`]: color,
    });

    const iconUrl = `${__ASSETS_BASE_URL__}uikit/icon/icons.svg#${name}`;

    return (
        <svg className={classNames} {...svgProps}>
            <use href={iconUrl}></use>
        </svg>
    );
};
