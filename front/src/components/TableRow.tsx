import React, { type JSX } from "react";
import MarkStatus from "./MarkStatus.js";
import type { TableRowProps } from "../constants/types.js";
import { useNavigate } from "react-router-dom";

const TableRow: React.FC<TableRowProps> = ({
  data,
  fullName,
  index,
}): JSX.Element => {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/detail/${data._id}`);
  }
  return (
    <div className=" flex justify-center">
      <div
        className="lg:px-16 px-0 flex flex-col justify-center"
        onClick={() => {
          handleNavigate();
        }}
      >
        <div className="flex md:gap-14 gap-2 text-center text-soft hover:scale-105 duration-300">
          <h1 className="w-20 rounded-xl">{index}</h1>
          <h1 className="w-20 rounded-xl">{fullName}</h1>
          <h1 className="w-20 rounded-xl">{data.age}</h1>
          <h1 className="w-20 rounded-xl">
            <MarkStatus age={data.age ?? null} />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TableRow);
