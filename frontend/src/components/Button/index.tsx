import { ComponentProps, FC } from "react";
import "./style.css";

interface ButtonStateProps {
  variant?: "primary" | "success" | "secondary";
}
interface ButtonDispatchProps {}

type ButtonProps = ButtonStateProps &
  ButtonDispatchProps &
  ComponentProps<"button">;

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  disabled,
  children,
  className,
  ...props
}) => {
  let style;
  if (disabled) {
    style = `button ${className || ""} ${disabled ? "disabled" : ""}`;
  } else {
    style = `button ${
      className || ""
    } button-${variant}-hover bg-${variant} border-${variant}`;
  }
  return (
    <button className={style} disabled={!!disabled} {...props}>
      {children}
    </button>
  );
};
