import React from "react";
import { PropsWithChildren } from "react";

const CustomWeek = ({ children }: PropsWithChildren) => {
  return (
    <tr className="custom-week">
      {React.Children.map(children, (child) => child)}
    </tr>
  );
};

export default CustomWeek;
