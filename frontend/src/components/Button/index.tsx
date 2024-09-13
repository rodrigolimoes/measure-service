import { ComponentProps, FC } from "react";
import "./style.css";

interface ButtonStateProps {
  variant?: "primary" | "success";
}
interface ButtonDispatchProps {}

type ButtonProps = ButtonStateProps &
  ButtonDispatchProps &
  ComponentProps<"button">;

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`button button-${variant}-hover bg-${variant} border-${variant} ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
