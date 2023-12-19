import cn from "classnames";

export const Card = ({ children, className, theme, ...props }) => {
    const classNames = cn("card", className, { [`card_${theme}`]: theme });

    return (
        <div className={classNames} {...props}>
            {children}
        </div>
    );
};

const CardFooter = ({ className, theme, ...props }) => (
    <div className={cn("card__footer-interface", className)} {...props} />
);

Card.Footer = CardFooter;
