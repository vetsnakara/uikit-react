interface Props {
  text: string;
  title: string;
  onClick: () => void;
}

export const Button: (props: Props) => Element;
