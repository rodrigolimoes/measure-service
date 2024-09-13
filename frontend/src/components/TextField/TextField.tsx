import "./style.css";
import { ComponentProps, FC, forwardRef } from "react";

interface TextFieldStateProps {}
interface TextFieldDispatchProps {}

type TextFieldProps = TextFieldDispatchProps &
  TextFieldStateProps &
  ComponentProps<"input">;

export const TextField: FC<TextFieldProps> = forwardRef(
  ({ endAdornment, error, helperText, className, ...props }, ref) => {
    return (
      <>
        <input className={`input ${className || ""}`} {...props} ref={ref} />
        {helperText && <span>{helperText}</span>}
      </>
    );
  }
);
