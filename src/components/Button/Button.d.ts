type Variant = "primary" | "secondary";

interface Props {
  text: string;
  title: string;
  variant: Variant;
  onClick: () => void;
}

export const Button: (props: Props) => Element;
