import React from "react";
import PropsTypes, { InferProps } from "prop-types";

const ButtonPropTypes = {
  title: PropsTypes.string,
};

/**
 * Button component
 *
 * @type {React.FC<InferProps<ButtonPropTypes>>} props
 * @returns {React.ReactElement}
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

Button.propTypes = ButtonPropTypes;
