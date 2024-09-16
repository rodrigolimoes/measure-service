import axios from "axios";

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

      return response.data
    } catch (e) {}
  };

  return [onSubmit];
};
