import axios from "axios";
import { useEffect, useState } from "react";

interface SearchMeasure {
  id?: string;
  type: string;
}

export const useGetMeasures = ({ id, type }: SearchMeasure) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const url =
      type === "all"
        ? `http://localhost:3000/${id}/list`
        : `http://localhost:3000/${id}/list?measure_type=${type}`;

    axios(url, {
      method: "GET",
    }).then(async (r) => {
      setData(r.data);
    });
  }, [id, type]);

  return {
    data,
  };
};
