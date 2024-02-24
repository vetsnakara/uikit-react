import cn from "classnames";
import { Icon } from "@/components";

/**
 * Badge
 *
 * @param {{
 *     className? string,
 *     icon?: string,
 *     variant?: "success"  | "error" | "warning" | "danger" | "transparent"
 *     round?: boolean,
 *     maxWidth?: 250,
 *     closeable?: boolean,
 *     onClose: () => void,
 *     children: import("react").ReactNode
 * } & import('react').HTMLAttributes<HTMLDivElement>} props
 */
export const Badge = (props) => {
    const { className, icon, variant, round, maxWidth, closeable, onClose, children } = props;

    const classNames = cn("badge", className, {
        [`badge_${variant}`]: variant,
        [`badge_max-width-${maxWidth}`]: maxWidth,
        badge_round: round,
    });

    return (
        <div className={classNames}>
            {icon && <Icon name={icon} className="badge__icon" />}

            <span className="badge__text">{children}</span>

            {closeable && (
                <button type="button" className="badge__button-icon" onClick={onClose}>
                    <Icon name="close" size="s" className="badge__close" />
                </button>
            )}
        </div>
    );
};
