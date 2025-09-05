import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
const DetailBox = ({ id, namee, agee, open, handelDelete, handelUpdate }) => {
  const [form, setForm] = useState({
    name: namee,
    age: agee,
    status: false,
  });
  return (
    <div className="min-h-60 card w-72 mx-auto bg-gradient-to-b from-green-400 to-green-800 z-20 text-white rounded-xl border border-green-400">
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
            type="text"
            value={form.age}
            onChange={(e) =>
              setForm({ ...form, age: e.target.value, status: true })
            }
            className="outline-none"
          />
          <hr className="text-white h-1 w-52" />
        </div>
        <div className="card-actions flex justify-between mt-5">
          {form.status ? (
            <button className="btn btn-warning" onClick={() => open()}>
              Cancel
              <span>
                <IoMdArrowBack className="size-5" />
              </span>
            </button>
          ) : (
            <button
              className="btn btn-active btn-neutral"
              onClick={() => open()}
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
            <button className="btn btn-error" onClick={() => handelDelete(id)}>
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
