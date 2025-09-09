import { useState } from "react";
import TableRow from "../components/TableRow.js";
import toast from "react-hot-toast";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddUsers from "../components/AddUsers.js";
import { v4 as uuidv4 } from "uuid";
import type {user} from "../constants/types.js"
type Counts = {
  teen: number;
  adult: number;
  old: number;
};



const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [blur, setBlur] = useState(false);
  const [persons, setPersons] = useState<user[]>([
    { id: uuidv4(), name: "Raj", age: 22 },
    { id: uuidv4(), name: "Ravi", age: 33 },
    { id: uuidv4(), name: "Sneha", age: 14 },
    { id: uuidv4(), name: "Amit", age: 40 },
    { id: uuidv4(), name: "Priya", age: 17 },
    { id: uuidv4(), name: "John", age: 29 },
    { id: uuidv4(), name: "Anita", age: 25 },
    { id: uuidv4(), name: "Vikram", age: 13 },
    { id: uuidv4(), name: "Sara", age: 23 },
    { id: uuidv4(), name: "Nikhil", age: 80 },
  ]);

  function handelAdd(data:user) {
    try {
      setPersons([...persons, { id: uuidv4(), name: data.name, age: data.age }]);
      setIsOpen(false);
      // toast.success("new user created successfully!! ");
    } catch (error) {
      console.log(error);
    }
  }
  function handelOpenAdd() {
    setIsOpen(!isOpen);
    setBlur(!blur);
  }
  function handelBlur() {
    setBlur(!blur);
  }

  function handelDelete(id:string) {
    try {
      if (!window.confirm("are you sure want to delete this record!!!")) return;
      const filteredData = persons.filter((item) => item.id != id);
      setPersons(filteredData);
      // toast.success("user deleted succesfully");
    } catch (error) {
      console.log(error);
    }
  }
  function handelUpdate(id: string, user: { name: string; age: number | null }) {
    try {
      const updatedUser = persons.map((item) =>
        item.id === id ? { id: id, name: user.name, age: user.age } : item
      );
      setPersons(updatedUser);
      // toast.success("user deleted sucessfully");
    } catch (error) {
      console.log(error);
    }
  }
  const counts = persons.reduce<Counts>(
    (acc, person) => {
      if(person.age===null)return acc;
      if (person.age < 18) {
        acc.teen++;
      } else if (person.age > 60) {
        acc.old++;
      } else {
        acc.adult++;
      }
      return acc;
    },
    { teen: 0, adult: 0, old: 0 }
  );
  const boxClasses =
    "flex flex-col items-center justify-center text-gray-600 shadow-lg shadow-gray-400 hover-border-green-600 hover:shadow-gray-600 hover:text-gray-800  hover:scale-105 duration-500 space-y-1 rounded-full border-2 size-24 border-green-400";
  return (
    <div className="min-h-screen relative px-40 pt-14 pb-8 bg-gradient-to-b from-green-100 to-green-400">
      <div
        className={`absolute inset-0 ${
          blur ? "bg-green-200 opacity-55" : ""
        } pointer-events-none`}
      ></div>

      <div className="px-20 flex flex-col  items-center">
        <div className="flex justify-around items-center mb-3 text-center w-[100%]">
          <div className={boxClasses}>
            Teens
            <span>{counts.teen}</span>
          </div>
          <div className={boxClasses}>
            Adults <span>{counts.adult}</span>
          </div>
          <div className={boxClasses}>
            Olds <span>{counts.old}</span>
          </div>
        </div>
        <div
          className="bg-green-500 p-2 hover:bg-green-600 text-xl duration-300 gap-2 flex items-center justify-center text-white rounded-lg"
          onClick={() => {
            handelOpenAdd();
          }}
        >
          {" "}
          <button className="">Add Data </button>
          <span className="size-4 mb-1">
            <IoIosAddCircleOutline />
          </span>
        </div>
        <h1 className="text-lg font-bold mx-auto tracking-wide underline mt-2 ">
          Here's The Data <span className="">...</span>
        </h1>
        <div className="flex gap-8 text-white text-center mt-2 text-l ">
          <h1 className="bg-green-500 w-20 hover:bg-green-600 rounded-xl">
            S.NO
          </h1>
          <h1 className="bg-green-500 w-20 hover:bg-green-600 rounded-xl">
            Name
          </h1>
          <h1 className="bg-green-500 w-20 hover:bg-green-600 rounded-xl">
            Age
          </h1>
          <h1 className="bg-green-500 w-28 hover:bg-green-600 rounded-xl">
            Category
          </h1>
        </div>
        <div>
          {persons.map((item, index) => (
            <div key={index + 1} className="mt-8 shadow-md shadow-gray-600 ">
              <TableRow
                data={item}
                index={index + 1}
                handelDelete={handelDelete}
                handelUpdate={handelUpdate}
                setBlur={handelBlur}
              />
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-[20%] z-10 left-[35%] shadow-2xl shadow-gray-900">
          <AddUsers open={handelOpenAdd} handelAdd={handelAdd} setBlur={setBlur} />
        </div>
      )}
    </div>
  );
};

export default Home;
