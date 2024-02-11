import cn from "classnames";

/**
 * Avatar
 *
 * @param {{
 *     src: string,
 *     className?: string,
 *     rounded?: boolean,
 *     size?: "big"  | "medium" | "small" | "smallest"
 * } & import('react').HTMLAttributes<HTMLDivElement>} props
 */
export const Avatar = (props) => {
    const { src, className, rounded, size, ...imgProps } = props;

    const classNames = cn("avatar", className, { avatar_rounded: rounded, [`avatar_${size}`]: size });

    return (
        <div className={classNames}>
            <img className="avatar__image" src={src} {...imgProps} />
        </div>
    );
};
