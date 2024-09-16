import { AxiosResponse } from "@/model/ApiError";
import axios from "axios";
import { toast } from "react-toastify";

interface ConfirmDto {
  confirmed_value: number;
	measure_uuid: string;
}

export const useConfirmMeasure = () => {
  const confirm = async ({confirmed_value, measure_uuid}: ConfirmDto) => {
    try {
      await axios({
        baseURL: "http://localhost:3000/confirm",
        method:"PATCH",
        data:{
          confirmed_value,
          measure_uuid
        }
      })
  
      toast.success("Medição confirmada com sucesso")
    } catch (e) {
      const {response} = e as unknown as AxiosResponse
      
      toast.error(response?.data.error_description)
    }
  }

  return [
    confirm
  ]
}