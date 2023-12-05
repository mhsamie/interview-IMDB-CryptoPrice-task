import { FC } from "react";

import TableRow from "./TableRow";
interface heads {
  label: string;
  minWidth: string;
}
[];
const Table: FC<{ children: React.ReactNode; tableHeads: heads[] }> = ({
  children,
  tableHeads,
}) => {
  const createHeads = (heads: heads[]) => {
    return heads.map((head, index) => (
      <th
        key={index}
        className={`text-start min-w-[${head.minWidth}] whitespace-nowrap px-6 py-2`}
      >
        {head.label}
      </th>
    ));
  };
  return (
    <div className="flex flex-col overflow-x-auto no-scroll">
      <div className="no-scroll">
        <div className="inline-block min-w-full py-2 ">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto mb-2 text-start text-sm font-light">
              <thead className="border-b-2  border-gray-400 font-medium">
                <TableRow>{createHeads(tableHeads)}</TableRow>
              </thead>
              <tbody>{children}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
