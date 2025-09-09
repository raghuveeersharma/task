import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import type { user } from "../constants/types.js"
type users = user &{
  status:boolean;
}
type DetailBoxProps={
  id:string,
  namee:string,
  agee:number|null,
  open:()=>void,
  setBlur:()=>void,
  handelDelete:(id:string)=>void,
  handelUpdate:(id:string,user:{name:string,age:number|null})=>void
}

const DetailBox:React.FC<DetailBoxProps> = ({
  id,
  namee,
  agee,
  open,
  setBlur,
  handelDelete,
  handelUpdate,
}) => {
  const [form, setForm] = useState<Omit<users,"id">>({
    name: namee,
    age: agee,
    status: false,
  });
  function handleClose() {
    setBlur();
    console.log(false);
    open();
  }
  return (
    <div className="min-h-60 card w-72 mx-auto bg-gradient-to-b from-green-400 to-green-800 z-20 text-white relative rounded-xl border border-green-400">
      <div className=" card-body flex flex-col gap-y-3">
        <div className="">
          <label>ID:</label>
          <p>{id}</p>
          <hr className="text-white h-1 w-52" />
        </div>
        <div className="flex flex-col">
          <label>NAME:</label>
          <input
            type="text"
            value={form.name}
            autoFocus
            onChange={(e) =>
              setForm({ ...form, name: e.target.value, status: true })
            }
            className="outline-none"
          />
          <hr className="text-white h-1 w-52" />
        </div>
        <div className="flex flex-col">
          <label>AGE:</label>

          <input
            type="number"
            value={form.age??""}
            onChange={(e) =>
              setForm({ ...form, age: e.target.value===""?null:Number(e.target.value), status: true })
            }
            className="outline-none"
          />
          <hr className="text-white h-1 w-52" />
        </div>
        <div className="card-actions flex justify-between mt-5">
          {form.status ? (
            <button
              className="btn btn-warning"
              onClick={handleClose}
            >
              Cancel
              <span>
                <IoMdArrowBack className="size-5" />
              </span>
            </button>
          ) : (
            <button
              className="btn btn-active btn-neutral"
              onClick={handleClose}
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

export default DetailBox;
