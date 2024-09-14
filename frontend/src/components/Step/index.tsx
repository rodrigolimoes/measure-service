import { FC, ReactNode } from "react";
import "./style.css";

interface Item {
  label: string;
  content: ReactNode;
}

interface StepsStateProps {
  step: number;
  items: Array<Item>;
}
interface StepsDispatchProps {}

type StepsProps = StepsStateProps & StepsDispatchProps;

export const Steps: FC<StepsProps> = ({ step = 0, items }) => {
  const item = items.find((_, index) => index === step);
  return (
    <>
      <div className="stepper-wrapper">
        {Array.isArray(items) && items.length > 0
          ? items.map(({ label }, index) => (
              <div
                key={`${label}-${index}`}
                className={`stepper-item ${
                  step >= index ? "completed" : step === index ? "active" : ""
                }`}
              >
                <div className="step-counter">{index + 1}</div>
                <div className="step-name">{label}</div>
              </div>
            ))
          : null}
      </div>
      {item?.content}
    </>
  );
};
