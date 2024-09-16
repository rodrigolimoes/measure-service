import { useState } from "react";
import { Steps } from "@/components/Step";
import { TypeMeasure } from "@/pages/CaptureMeasure/components/TypeMeasure";
import { CaptureMeasure } from "@/pages/CaptureMeasure/components/CaptureMeasure";
import { MeasureContext, MeasureInfo } from "./Context";
import { Confirm } from "./components/Confirm";
import { useConfirmMeasure } from "@/hooks/useConfirmMeasure";
import { useNavigate, useParams } from "react-router-dom";

export const MeasureStep = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [measureInfo, setMeasureInfo] = useState<MeasureInfo | null>(null);
  const [step, setStep] = useState(0);
  const [isConfirm, setConfirm] = useState(false);
  const [confirm] = useConfirmMeasure()


  const onNext = () => setStep((prevState) => prevState + 1);

  const onConfirm = (value: boolean) => setConfirm(value);

  const onSubmit = () => {
    if(isConfirm){
      confirm({
        confirmed_value: Number(measureInfo?.measureValue),
        measure_uuid: measureInfo?.measureUuid || ""
      })
    }

    navigate(`/${id}/measures`)
  }

  return (
    <MeasureContext.Provider value={{
      ...measureInfo,
      isConfirm,
      onSetMeasure: (values) =>{
        setMeasureInfo(prevState =>({
          ...prevState,
          ...values
        }))
      },
      onConfirm
    }}>
        <>
      <Steps
        step={step}
        onChange={(step) => {
          setStep(step);
        }}
        onSubmit={onSubmit}
        items={[
          {
            label: "Tipo de medição",
            content: <TypeMeasure onNext={onNext} />,
          },
          {
            label: "Capturar Medição",
            content: <CaptureMeasure onNext={onNext} />,
          },
          {
            label: "Confirmação",
            content: <Confirm/>,
          },
        ]}
      />
    </>
    </MeasureContext.Provider>
  );
};
