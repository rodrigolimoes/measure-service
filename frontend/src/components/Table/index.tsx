import { FC } from "react";
import { v4 } from "uuid";
import "./style.css";

interface Column {
  id: string;
  label: string;
  width?: string;
}

interface TableStateProps {
  columns: Array<Column>;
  items: Record<string, (data: any, index: number) => any>;
  data: Array<unknown>;
}
interface TableDispatchProps {}

type TableProps = TableStateProps & TableDispatchProps;

export const Table: FC<TableProps> = ({ columns, data, items }) => {
  const renderDefault = () => null;

  const headers =
    Array.isArray(columns) && columns.length > 0 ? (
      <tr>
        {columns.map(({ id, label, width }, index) => {
          return (
            <th className={`table-th ${width || ""}`} key={`${id}-${index}`}>
              {label}
            </th>
          );
        })}
      </tr>
    ) : null;

  const body =
    Array.isArray(data) && data.length > 0
      ? data.map((data, index) => {
          return (
            <tr key={v4()} className="table-tr">
              {Array.isArray(columns) && columns.length > 0
                ? columns.map(({ id, width }) => {
                    const renderItem = items
                      ? items[id] || renderDefault
                      : renderDefault;
                    return (
                      <td key={v4()} className={`table-td ${width || ""}`}>
                        <div>{renderItem(data, index)}</div>
                      </td>
                    );
                  })
                : null}
            </tr>
          );
        })
      : null;
  return (
    <div className="table-wrapper">
      <table>
        <thead>{headers}</thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
};
