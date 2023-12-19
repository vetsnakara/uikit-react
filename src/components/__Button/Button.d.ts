import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  title: string;
  variant: Variant;
  onClick: () => void;
}

export const Button: (props: Props) => Element;
