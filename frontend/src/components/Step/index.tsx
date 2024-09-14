import { FC, ReactNode } from "react";
import "./style.css";
import { Button } from "@/components/Button";

interface Item {
  label: string;
  content: ReactNode;
}

interface StepsStateProps {
  step: number;
  items: Array<Item>;
}
interface StepsDispatchProps {
  onChange: (step: number) => void;
}

type StepsProps = StepsStateProps & StepsDispatchProps;

export const Steps: FC<StepsProps> = ({ step = 0, items, onChange }) => {
  const item = items.find((_, index) => index === step);

  return (
    <div className="m-auto">
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
      <div className="flex justify-between p-16">
        <div className="w-240">
          <Button
            variant="primary"
            disabled={step === 0}
            onClick={() => {
              onChange(step - 1);
            }}
          >
            Voltar
          </Button>
        </div>
        <div className="w-240">
          <Button
            variant="primary"
            className="float-right m-l-6 "
            disabled={step === items.length - 1}
            onClick={() => {
              if (step < items.length - 1) {
                onChange(step + 1);
              }
            }}
          >
            Próximo
          </Button>
          <Button variant="secondary" className="float-right text-black">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};
