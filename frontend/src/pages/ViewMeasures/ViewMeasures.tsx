import { FC } from "react";
import { useParams } from "react-router-dom";
import { Table } from "@/components/Table";
import { useGetMeasures } from "@/hooks/useGetMeasures";

interface ViewMeasuresStateProps {}
interface ViewMeasuresDispatchProps {}

type ViewMeasuresProps = ViewMeasuresStateProps & ViewMeasuresDispatchProps;

const ViewMeasures: FC<ViewMeasuresProps> = () => {
  const { id } = useParams();
  const { data } = useGetMeasures(id);

  return (
    <>
      <Table
        columns={[
          {
            id: "datetime",
            label: "Data da medição",
          },
          {
            id: "type",
            label: "Tipo",
          },
        ]}
        items={{
          datetime: ({ measure_datetime }) => measure_datetime,
          type: ({ measure_type }) => measure_type,
        }}
        data={data?.measures || []}
      />
    </>
  );
};

export default ViewMeasures;
