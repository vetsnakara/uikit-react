export function Badge(props: {
    className?: any;
    string: any;
    icon?: string;
    variant?: "success" | "error" | "warning" | "danger" | "transparent";
    round?: boolean;
    maxWidth?: 250;
    closeable?: boolean;
    onClose: () => void;
    children: import("react").ReactNode;
} & import("react").HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
