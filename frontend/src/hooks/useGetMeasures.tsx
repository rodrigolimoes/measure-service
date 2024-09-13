import * as React from "react";
import { useEffect, useState } from "react";

export const useGetMeasures = (id) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch(`http://localhost:80/${id}/list`, { method: "GET" }).then(
      async (r) => {
        const response = await r.json();
        setData(response);
      }
    );
  }, [id]);

  return {
    data,
  };
};
