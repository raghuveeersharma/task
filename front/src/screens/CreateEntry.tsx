import { useNavigate } from "react-router-dom";
import type { User } from "../constants/types.js";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { BiLeftArrow } from "react-icons/bi";

const CreateEntry = () => {
  const navigate = useNavigate();
  const [array, setArray] = useState<User[]>([]);
  const [data, setData] = useState<User>({
    id: uuidv4(),
    name: "",
    last_name: "",
    age: null,
  });
  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("persons") || "[]");
    setArray(res);
  }, []);
  const handleSave = () => {
    try {
      const { name, last_name } = data;
      if (
        array.find(
          (item) =>
            item.name.toLowerCase() === name.toLowerCase() &&
            item.last_name.toLowerCase() === last_name.toLowerCase()
        )
      ) {
        alert("Duplicate Entry Not Allowed");
        return;
      }
      const newData = [...array, data];
      localStorage.setItem("persons", JSON.stringify(newData));
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("new", array);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-300">
      <h1 className="text-xl md:text-2xl text-success mb-6">
        Entry Creation Page!!
      </h1>
      <div className="md:w-96 w-64 h-96 border-2 border-green-300 bg-neutral shadow-xl shadow-base-100 p-4 not-even:rounded-xl text-white rounded-lg">
        <div className="flex mb-5">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
            <span>
              <BiLeftArrow />
            </span>
            Back
          </button>
        </div>
        <div className="flex flex-col gap-5 ">
          <div className="flex flex-col">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter your Name"
              required
              autoFocus
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="outline-none "
            />
            <hr className="text-white h-1 lg:w-80 w-52" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              placeholder="Enter your Last Name"
              required
              value={data.last_name}
              onChange={(e) => setData({ ...data, last_name: e.target.value })}
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
              required
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
              handleSave();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEntry;
