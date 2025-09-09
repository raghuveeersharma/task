import { useState } from "react";
import MarkStatus from "./MarkStatus.js";
import DetailBox from "./DetailBox.js";
import type {user as User } from "../constants/types.js"

type TableRowProps = {
  data: User;
  index: number;
  handelDelete: (id: string) => void;
  setBlur: () => void;
  handelUpdate: (id: string, user: { name: string; age: number | null }) => void;
};

const TableRow:React.FC<TableRowProps> = ({ data, index, handelDelete, setBlur, handelUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  function handelOpen() {
    setIsOpen(!isOpen);
    setBlur();
  }

  return (
    <div className="">
      <div
        className="px-20 flex flex-col justify-center"
        onClick={() => {
          handelOpen();
        }}
      >
        <div className="flex gap-8 text-center hover:scale-105 duration-300">
          <h1 className="w-20 rounded-xl">{index}</h1>
          <h1 className="w-20 rounded-xl">{data.name}</h1>
          <h1 className="w-20 rounded-xl">{data.age}</h1>
          <h1 className="w-20 rounded-xl">
            <MarkStatus age={data.age} />
          </h1>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-[20%] left-[40%] shadow-xl shadow-green-200">
          <DetailBox
            id={data.id}
            namee={data.name}
            agee={data.age}
            open={handelOpen}
            setBlur={setBlur}
            handelDelete={handelDelete}
            handelUpdate={handelUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default TableRow;
