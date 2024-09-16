import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "@/components/Table";
import { useGetMeasures } from "@/hooks/useGetMeasures";

interface ViewMeasuresStateProps {}
interface ViewMeasuresDispatchProps {}

type ViewMeasuresProps = ViewMeasuresStateProps & ViewMeasuresDispatchProps;

const ViewMeasures: FC<ViewMeasuresProps> = () => {
  const { id } = useParams();
  const [type, setType] = useState("all");
  const { data } = useGetMeasures({ id, type });

  return (
    <div className="flex gap-6 flex-col">
      <div className="filter-container">
        <label htmlFor="filter">Filtrar por:</label>
        <select
          id="filter"
          className="filter-dropdown"
          value={type}
          onChange={(event) => {
            setType(event.target.value);
          }}
        >
          <option value="all">Todos</option>
          <option value="WATER">Água</option>
          <option value="GAS">Gás</option>
        </select>
      </div>
      <div>
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
            datetime: ({ measure_datetime }) =>
              new Date(measure_datetime).toLocaleDateString("pt-BR"),
            type: ({ measure_type }) => measure_type,
          }}
          data={data?.measures || []}
        />
      </div>
    </div>
  );
};

export default ViewMeasures;
