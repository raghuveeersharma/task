import { useState } from "react";
import MarkStatus from "./MarkStatus";
import DetailBox from "./DetailBox";

const TableRow = ({ data, index, handelDelete, handelUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  function handelOpen() {
    setIsOpen(!isOpen);
  }

  function getting() {
    const key = localStorage.getItem("person_ID");
    console.log(key);
  }
  return (
    <div className="">
      <div
        className="px-20 flex flex-col justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className="flex gap-8 text-center hover:scale-105 duration-300"
          onClick={getting}
        >
          <h1 className="w-20 rounded-xl">{index}</h1>
          <h1 className="w-20 rounded-xl">{data.name}</h1>
          <h1 className="w-20 rounded-xl">{data.age}</h1>
          <h1 className="w-20 rounded-xl">
            <MarkStatus age={data.age} />
          </h1>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-[30%] left-[40%] shadow-xl shadow-green-200">
          <DetailBox
            id={data.id}
            namee={data.name}
            agee={data.age}
            open={handelOpen}
            handelDelete={handelDelete}
            handelUpdate={handelUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default TableRow;
