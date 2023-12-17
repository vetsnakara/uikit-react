/**
 * Button component
 */
export const Button = (props) => {
  const { title, children, ...restProps } = props;

  return (
    <div>
      {title && <h1>{title}</h1>}
      <button {...restProps}>{children}</button>
    </div>
  );
};
