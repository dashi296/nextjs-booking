import React from "react";
import { Dayjs } from "dayjs";

type Props = {
  date: Dayjs;
  booked: boolean;
};

const CustomDate = ({ date, booked }: Props) => {
  return (
    <td className={`custom-date border p-2 ${booked && "bg-slate-300"}`}>
      {date.format("D")}
    </td>
  );
};

export default CustomDate;
