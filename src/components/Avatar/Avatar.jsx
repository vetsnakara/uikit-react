import cn from "classnames";

export const AvatarSize = {
    Big: "big",
    Medium: "medium",
    Small: "small",
    Smallest: "smallest",
};

// todo: useMemo, forwardRef ?

export const Avatar = ({ src, className, rounded, size, ...props }) => {
    const classNames = cn("avatar", className, { avatar_rounded: rounded, [`avatar_${size}`]: size });

    return (
        <div className={classNames}>
            <img className="avatar__image" src={src} {...props} />
        </div>
    );
};
