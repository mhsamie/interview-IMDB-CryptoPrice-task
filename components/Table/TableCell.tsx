import { FC } from "react";

const TableCell: FC<{ children: React.ReactNode; colSpan?: number }> = ({
  children,
  colSpan,
}) => {
  return (
    <td colSpan={colSpan} className="px-6 py-6">
      {children}
    </td>
  );
};

export default TableCell;
