import { useEffect, useState } from "react";
import { FaCheck, FaRegTrashCan } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import type { User } from "../constants/types.js";
import { toast } from "react-hot-toast";
import { api } from "../utils/axios.js";
import { deleteUser, updateUser } from "../utils/user.utlis.js";

const RowDetail = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [form, setForm] = useState<Omit<User, "_id">>({
    name: "",
    last_name: "",
    age: 45,
    status: false,
  });
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await api.get(`/user/${_id}`);
        if (user) {
          const first = user.data.user.name.split(" ").at(0);
          const second = user.data.user.name.split(" ").at(1);
          setForm({
            name: first ?? "",
            last_name: second ?? "",
            age: user.data.user.age ?? null,
            status: false,
          });
        }
      } catch (error) {
        console.log("error in getting user", error);
      }
    };
    getUser();
  }, []);

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? (value === "" ? null : Number(value)) : value,
      status: true,
    }));
  };
  const handleDelete = async () => {
    if (!window.confirm("are you sure want to delete this record!!!")) return;
    try {
      deleteUser(_id ?? "")?.then((res) => console.log(res));
      toast.success("user deleted successfully!!");
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      updateUser(_id ?? "", form);
      toast.success("user updated succesfully!!");
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-300">
      <h1 className="lg:text-2xl md:text-xl text-base card-title mb-5">
        Detail page, here you can
        <span className="text-error font-medium">Mutate</span> entry!!
      </h1>
      <div className="min-h-64 card lg:w-96 w-60 mx-auto bg-base-100 z-20 text-gray-100 relative rounded-xl border-2 border-green-300">
        <div className=" card-body flex flex-col justify-center lg:text-xl text-base gap-y-3">
          <div className="lg:text-base text-xs">
            <label>ID:</label>
            <p>{_id}</p>
            <hr className="text-white h-1 lg:w-80 w-52" />
          </div>
          <div className="flex flex-col">
            <label>NAME:</label>
            <input
              type="text"
              name="name"
              spellCheck="false"
              value={form.name}
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
              spellCheck="false"
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
          <div className="card-actions flex lg:justify-between justify-center mt-5">
            {form.status ? (
              <button
                className="flex md:text-lg text-base gap-2 w-24 h-8 md:w-36 md:h-12 bg-blue-500 hover:bg-blue-600 text-white items-center justify-center rounded-md"
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
                className="flex md:text-lg text-base gap-2 w-24 h-8 md:w-36 md:h-12 bg-amber-400 hover:bg-amber-500 text-white items-center justify-center rounded-md"
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
                className="flex md:text-lg text-base gap-2 w-24 h-8 md:w-36 md:h-12 bg-green-400 hover:bg-green-500 text-white items-center justify-center rounded-md"
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
                className="flex md:text-lg text-base gap-2 w-24 h-8 md:w-36 md:h-12 bg-red-500 hover:bg-red-600 text-white items-center justify-center rounded-md"
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
