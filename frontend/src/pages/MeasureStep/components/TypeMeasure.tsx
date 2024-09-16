import { FC } from "react";
import { Button } from "@/components/Button";
import WaterExample from "@/assets/example-water.webp";
import GasExample from "@/assets/example-gas.webp";
import { useMeasureContext } from "../Context";

interface TypeMeasureStateProps {}
interface TypeMeasureDispatchProps {
  onNext: () => void;
}

type TypeMeasureProps = TypeMeasureStateProps & TypeMeasureDispatchProps;

export const TypeMeasure: FC<TypeMeasureProps> = ({ onNext }) => {
  const { onSetMeasure, measureType = "WATER" } = useMeasureContext();
  return (
    <div className="w-100 flex flex-col justify-center items-center gap-6">
      <div className="flex flex-col">
        <label htmlFor="type" className="m-b-6">
          Tipo de Medição
        </label>
        <select
          id="type"
          value={measureType}
          className="filter-dropdown w-384"
          onChange={({ target }) => {
            if (target?.value)
              onSetMeasure({
                measureType: target?.value || "",
              });
          }}
        >
          <option value="WATER">Água</option>
          <option value="GAS">Gás</option>
        </select>
      </div>
      <div>
        <img
          className="w-240"
          src={
            measureType && measureType === "WATER" ? WaterExample : GasExample
          }
          alt={""}
        />
      </div>
      <div>
        <Button onClick={onNext}>Continuar</Button>
      </div>
    </div>
  );
};
