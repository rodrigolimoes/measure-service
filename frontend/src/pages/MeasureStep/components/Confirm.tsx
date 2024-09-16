import { FC, useState, ChangeEvent } from "react"
import { useMeasureContext } from "../Context"
import { TextField } from "@/components/TextField/TextField"

interface ConfirmStateProps {}
interface ConfirmDispatchProps {}

type ConfirmProps = ConfirmStateProps & ConfirmDispatchProps

export const Confirm: FC<ConfirmProps> = ({}) => {
  const { imageUrl,  measureValue, onConfirm, onSetMeasure } = useMeasureContext()
  const [value, setValue] = useState<string>(measureValue?.toString() || "")

  const onChange = ({target}: ChangeEvent<HTMLInputElement>) =>  {
    if(target?.value != value){
      onConfirm(true) 
    } else {
      onConfirm(false)
    }
    setValue(target?.value)
    onSetMeasure({
      measureValue: Number(target?.value)
    })
  }

  return  <div className="flex flex-col justify-center items-center gap-6">
    <img src={imageUrl} alt="foto capturada"/>
    <TextField onChange={onChange} value={value}/>
    <span className="text-sm">Se o valor da medição estiver incorreto, por favor, ajuste o valor no campo de entrada.</span>
  </div>
}