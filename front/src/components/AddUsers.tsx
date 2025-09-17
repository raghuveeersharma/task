import { useEffect, useState, type ReactNode } from "react";
import { ImCross } from "react-icons/im";
import { v4 as uuidv4 } from "uuid";
import type { User, AddUsersProps } from "../constants/types.js";

const AddUsers: React.FC<AddUsersProps> = ({
  open,
  handelAdd,
  setBlur,
}): ReactNode => {
  const [data, setData] = useState<User>({
    id: uuidv4(),
    name: "",
    age: null,
  });
  useEffect(() => {
    console.log("mounted add user");
    return () => {
      console.log("unmounted add user");
    };
  }, []);
  console.log("add user");
  return (
    <div className="md:w-96 w-64 md:h-72 h-52 border-2 border-green-300 bg-neutral shadow-2xl shadow-gray-600 p-4 not-even:rounded-xl text-white">
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
          <hr className="text-white h-1 lg:w-80 w-52" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Age</label>
          <input
            type="number"
            placeholder="Enter your Age"
            value={data.age ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                age: e.target.value === "" ? null : Number(e.target.value),
              })
            }
            className="outline-none "
          />
          <hr className="text-white h-1 lg:w-80 w-52" />
        </div>
        <button
          className="bg-success hover:bg-gray-200 text-black duration-300 mt-3 rounded-lg mx-auto h-12 w-20"
          onClick={() => {
            handelAdd(data);
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
