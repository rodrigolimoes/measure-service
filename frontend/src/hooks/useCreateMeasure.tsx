import { AxiosResponse } from "@/model/ApiError";
import axios from "axios";
import { toast } from "react-toastify";

interface MeasureDto {
  customer_code: string;
  measure_datetime: string;
  measure_type: string;
  image: string;
}

interface MeasureResponse {
  image_url: string;
  measure_value: number;
  measure_uuid: string;
}

export const useCreateMeasure = () => {
  const onSubmit = async ({
    customer_code,
    measure_datetime,
    measure_type,
    image,
  }: MeasureDto): Promise<MeasureResponse | undefined> => {
    try {
      const response = await axios("http://localhost:80/upload", {
        method: "POST",
        data: {
          customer_code,
          image,
          measure_datetime,
          measure_type,
        },
      });

      toast.success("Medição realizada com sucesso");

      return response.data;
    } catch (e) {
      const { response } = e as unknown as AxiosResponse;

      toast.error(response?.data.error_description);
    }
  };

  return [onSubmit];
};
