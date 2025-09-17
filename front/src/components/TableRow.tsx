import React, { useCallback, useEffect, useState, type JSX } from "react";
import MarkStatus from "./MarkStatus.js";
import DetailBox from "./DetailBox.js";
import type { TableRowProps } from "../constants/types.js";
import { useNavigate } from "react-router-dom";

const TableRow: React.FC<TableRowProps> = ({
  data,
  fullName,
  index,
  handelDelete,
  setBlur,
  handelUpdate,
}): JSX.Element => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handelOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
    setBlur();
  }, []);
  useEffect(() => {
    console.log("mounted tablerow");
    return () => {
      console.log("unmounted tablerow");
    };
  }, []);
  function handleNavigate() {
    navigate(`/detail/${data.id}`);
  }
  console.log("rendered tablerow");
  return (
    <div className="w-[100%]   flex justify-center">
      <div
        className="lg:px-16 px-0 flex flex-col w-[80%] justify-center"
        onClick={() => {
          handleNavigate();
        }}
      >
        <div className="flex md:gap-14 gap-9 text-center text-soft hover:scale-105 duration-300">
          <h1 className="w-20 rounded-xl">{index}</h1>
          <h1 className="w-20 rounded-xl">{fullName}</h1>
          <h1 className="w-20 rounded-xl">{data.age}</h1>
          <h1 className="w-20 rounded-xl">
            <MarkStatus age={data.age ?? null} />
          </h1>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-[20%] left-[20%] lg:left-[35%] shadow-2xl shadow-gray-900">
          <DetailBox
            id={data.id ?? ""}
            namee={data.name ?? ""}
            agee={data.age ?? null}
            open={handelOpen}
            handelDelete={handelDelete}
            handelUpdate={handelUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(TableRow);
