export function Avatar({ src, className, rounded, size, ...props }: {
    src: string;
    className?: string;
    rounded?: boolean;
    size?: "big" | "medium" | "small" | "smallest";
} & import('react').HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
