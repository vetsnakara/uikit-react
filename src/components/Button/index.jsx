import React from "react";
import PropTypes, { InferProps } from "prop-types";

const ButtonPropTypes = {
  title: PropTypes.string,
  optionalEnum: PropTypes.oneOf(["News", "Photos"]),
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
