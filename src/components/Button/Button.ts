import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

type ButtonVariant = "secondary" | "plain";
type ButtonSize = "m" | "l" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;

    /**
     * Тема кнопки
     */
    variant?: ButtonVariant;
    /**
     * Размер кнопки в соответствии с дизайн-системой
     */
    size?: ButtonSize;
    /**
     * Флаг, делающий кнопку квадратной
     */
    square?: boolean;
    /**
     * Флаг, делающий кнопку недоступной
     */
    disabled?: boolean;
    /**
     * Увеличивает кнопку на всю свободную ширину
     */
    fullwidth?: boolean;
    /**
     *
     */
    children: ReactNode;
}

// for interlal lib usage in JSDoc
export type ButtonType = ReturnType<typeof forwardRef<HTMLButtonElement, ButtonProps>>;

// for exterlal lib usage
declare const Button: ButtonType;
export default Button;
