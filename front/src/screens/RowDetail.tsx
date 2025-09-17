import { useEffect, useState } from "react";
import { FaCheck, FaRegTrashCan } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import type { User } from "../constants/types.js";

const RowDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const [form, setForm] = useState<Omit<User, "id">>({
    name: "",
    last_name: "",
    age: 45,
    status: false,
  });
  const [data, setData] = useState<User[]>([]);
  useEffect(() => {
    const pData = JSON.parse(localStorage.getItem("persons") || "[]");
    setData(pData);
    const user = pData.find((item: User) => item.id === id);
    if (user) {
      setForm({
        name: user.name ?? "",
        last_name: user.last_name,
        age: user.age ?? null,
        status: false,
      });
    }
    console.log("mounted row detail");
  }, []);
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? (value === "" ? null : Number(value)) : value,
      status: true,
    }));
  };
  const handleDelete = () => {
    if (!window.confirm("are you sure want to delete this record!!!")) return;
    try {
      const filteredData = data.filter((item: User) => item.id != id);
      localStorage.setItem("persons", JSON.stringify(filteredData));
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = () => {
    try {
      const updatedData = data.map((item: User) => {
        if (item.id === id) {
          return {
            ...item,
            name: form.name,
            last_name: form.last_name,
            age: form.age ?? null,
          };
        }
        return item;
      });
      localStorage.setItem("persons", JSON.stringify(updatedData));
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-300">
      <h1 className="md:text-2xl text-xl card-title mb-5">
        Detail page, here you can{" "}
        <span className="text-error font-medium">Mutate</span> entry!!
      </h1>
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
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
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
              <button
                className="btn btn-warning"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
                <span>
                  <IoMdArrowBack className="size-5" />
                </span>
              </button>
            ) : (
              <button
                className="btn btn-active btn-neutral"
                onClick={() => {
                  navigate(-1);
                }}
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
                  handleUpdate();
                }}
              >
                Update
                <span>
                  <FaCheck />
                </span>
              </button>
            ) : (
              <button
                className="btn btn-error"
                onClick={() => {
                  handleDelete();
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
    </div>
  );
};

export default RowDetail;
