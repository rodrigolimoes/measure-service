import axios from "axios";

interface ConfirmDto {
  confirmed_value: number;
	measure_uuid: string;
}

export const useConfirmMeasure = () => {
  const confirm = async ({confirmed_value, measure_uuid}: ConfirmDto) => {
    await axios({
      baseURL: "http://localhost:80/confirm",
      method:"PATCH",
      data:{
        confirmed_value,
        measure_uuid
      }
    })
  }

  return [
    confirm
  ]
}