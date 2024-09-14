import * as React from "react";
import { useEffect, useState } from "react";

export const useGetMeasures = ({ id, type }) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const url =
      type === "all"
        ? `http://localhost:80/${id}/list`
        : `http://localhost:80/${id}/list?measure_type=${type}`;

    fetch(url, {
      method: "GET",
    }).then(async (r) => {
      const response = await r.json();
      setData(response);
    });
  }, [id, type]);

  return {
    data,
  };
};
