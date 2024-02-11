import cn from "classnames";

/**
 * Card
 *
 * @param {{
 *     theme?: "muted",
 * } & import('react').HTMLAttributes<HTMLDivElement>} props
 */
export const Card = (props) => {
    const { children, className, theme, ...otherProps } = props;

    const classNames = cn("card", className, { [`card_${theme}`]: theme });

    return (
        <div className={classNames} {...otherProps}>
            {children}
        </div>
    );
};

const CardFooter = ({ className, ...props }) => <div className={cn("card__footer-interface", className)} {...props} />;

Card.Footer = CardFooter;
