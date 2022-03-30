/**
 *
 * @param {ReactNode} title
 * @param {string} color //primary, secondary, success, danger, warning, info, light, dark
 * @param {boolean} disabled
 * @param {string} type //button, submit, reset
 * @param {string | null} size //btn-sm, btn-lg, btn-block, null
 * @param {boolean} active
 * @returns
 */

import classNames from "classnames";
import PropTypes from "prop-types";

const Button = ({
  title,
  color,
  disabled,
  type = "button",
  size,
  active,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={classNames(`btn btn-${color}`, size, props.className)}
      {...props}
    >
      {title}
      {props.children}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.node,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.string,
  active: PropTypes.bool,
};

export default Button;
