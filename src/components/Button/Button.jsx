/**
 * @param {import('./Button').Props} props
 */
export const Button = (props) => {
  const { title, children, ...restProps } = props;

  return (
    <div>
      {title ? <h1>{title}</h1> : "No title"}
      <button {...restProps}>{children}</button>
    </div>
  );
};
