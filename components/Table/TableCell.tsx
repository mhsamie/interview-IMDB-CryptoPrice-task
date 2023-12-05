import { FC } from "react";

const TableCell: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <td className=" px-6 py-6">{children}</td>;
};

export default TableCell;
