import React, { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import type { User, DetailBoxProps } from "../constants/types.js";

const DetailBox: React.FC<DetailBoxProps> = ({
  id,
  namee,
  agee,
  open,
  handelDelete,
  handelUpdate,
}) => {
  const [form, setForm] = useState<Omit<User, "id" | "last_name">>({
    name: namee,
    age: agee,
    status: false,
  });
  function handleClose() {
    open();
  }
  useEffect(() => {
    console.log("mounted detail box");
    return () => {
      console.log("unmounted detail box");
    };
  }, []);
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? (value === "" ? null : Number(value)) : value,
      status: true,
    }));
  };
  console.log("detail box");
  return (
    <div className="min-h-64 card lg:w-96 w-60 mx-auto bg-neutral z-20 text-gray-100 relative rounded-xl border-2 border-green-300">
      <div className=" card-body flex flex-col justify-center lg:text-xl text-base gap-y-3">
        <div className="md:text-base text-xs">
          <label>ID:</label>
          <p>{id}</p>
          <hr className="text-whit)}, [e h-1 lg:w-80 w-52" />
        </div>
        <div className="flex flex-col">
          <label>NAME:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            autoFocus
            onChange={(e) => handelChange(e)}
            className="outline-none"
          />
          <hr className="text-white h-1 lg:w-80 w-52" />
        </div>
        <div className="flex flex-col">
          <label>AGE:</label>

          <input
            name="age"
            type="number"
            value={form.age ?? ""}
            onChange={handelChange}
            className="outline-none"
          />
          <hr className="text-white h-1 lg:w-80 w-52" />
        </div>
        <div className="card-actions flex justify-between mt-5">
          {form.status ? (
            <button className="btn btn-warning" onClick={() => handleClose()}>
              Cancel
              <span>
                <IoMdArrowBack className="size-5" />
              </span>
            </button>
          ) : (
            <button
              className="btn btn-active btn-neutral"
              onClick={() => handleClose()}
            >
              CLOSE{" "}
              <span>
                <ImCross />
              </span>
            </button>
          )}
          {form.status ? (
            <button
              className="btn btn-success"
              onClick={() => {
                handelUpdate(id, form);
                open();
              }}
            >
              Update{" "}
              <span>
                <FaCheck />
              </span>
            </button>
          ) : (
            <button
              className="btn btn-error"
              onClick={() => {
                handelDelete(id);
                open();
              }}
            >
              Delete{" "}
              <span>
                <FaRegTrashCan />
              </span>{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(DetailBox);
