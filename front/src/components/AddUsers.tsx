import { useState } from "react";
import { ImCross } from "react-icons/im";
import { v4 as uuidv4 } from "uuid";
import type {user } from "../constants/types.js"

type AddUsersProps={
  open:()=>void,
  handelAdd:(data:{id:string,name:string,age:number|null})=>void,
  setBlur:(s:boolean)=>void
}

const AddUsers:React.FC<AddUsersProps> = ({ open, handelAdd,setBlur }) => {
  const [data, setData] = useState<user>({
    id: uuidv4(),
    name: "",
    age: null,
  });
  return (
    <div className="w-96 h-72 bg-gray-800 border-2 border-green-300 bg-gradient-to-b from-green-400 to-green-600 shadow-2xl shadow-green-200 p-4 not-even:rounded-xl text-white">
      <div className="flex justify-end">
        <span onClick={open}>
          <ImCross />
        </span>
      </div>
      <div className="flex flex-col gap-5 ">
        <div className="flex flex-col">
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Enter your Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="outline-none "
          />
          <hr className="text-white h-1 w-80" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Age</label>
          <input
            type="number"
            placeholder="Enter your Age"
            value={data.age??""}
            onChange={(e) => setData({ ...data, age: e.target.value===""?null:Number(e.target.value) })}
            className="outline-none "
          />
          <hr className="text-white h-1 w-80" />
        </div>
        <button
          className="bg-white hover:bg-gray-200 text-black duration-300 mt-3 rounded-lg mx-auto h-12 w-20"
          onClick={() => {handelAdd(data)
            setBlur(false);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddUsers;
