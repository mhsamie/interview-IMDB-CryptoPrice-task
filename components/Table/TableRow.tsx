import React, { FC } from "react";

const TableRow: FC<{
  classes?: string;
  children: React.ReactNode;
  onclick?: () => void;
}> = ({ classes, children, onclick }) => {
  return (
    <tr onClick={onclick} className={classes}>
      {children}
    </tr>
  );
};

export default TableRow;
