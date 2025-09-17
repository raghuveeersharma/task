import { useCallback, useEffect, useMemo, useState } from "react";
import TableRow from "../components/TableRow.js";
import { toast } from "react-hot-toast";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddUsers from "../components/AddUsers.js";
import type { User, Counts } from "../constants/types.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.js";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [blur, setBlur] = useState(false);
  const [persons, setPersons] = useState<User[]>(() => {
    const saved = localStorage.getItem("persons");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "1a2b3c4d-5678-90ab-cdef-1234567890ab",
            name: "Raj",
            last_name: "Kumar",
            age: 22,
          },
          {
            id: "2b3c4d5e-6789-01bc-def0-2345678901bc",
            name: "Anita",
            last_name: "Sharma",
            age: 28,
          },
          {
            id: "3c4d5e6f-7890-12cd-ef01-3456789012cd",
            name: "Amit",
            last_name: "Verma",
            age: 31,
          },
          {
            id: "4d5e6f70-8901-23de-f012-4567890123de",
            name: "Pooja",
            last_name: "Singh",
            age: 25,
          },
          {
            id: "5e6f7081-9012-34ef-0123-5678901234ef",
            name: "Vikram",
            last_name: "Patel",
            age: 29,
          },
          {
            id: "6f708192-0123-45f0-1234-6789012345f0",
            name: "Sonia",
            last_name: "Reddy",
            age: 27,
          },
        ];
  });
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("persons", JSON.stringify(persons));
  }, [persons]);
  const [query, setQuery] = useState<{
    name: string;
    status?: boolean | null;
    arr: User[];
  }>({
    name: "",
    status: false,
    arr: persons || [],
  });

  const handelAdd = useCallback(
    (data: User) => {
      // try {
      //   setPersons([
      //     ...persons,
      //     { id: uuidv4(), name: data.name ?? "", age: data.age ?? 0 },
      //   ]);
      //   setIsOpen(false);
      //   toast.success("new user created successfully!! ");
      // } catch (error) {
      //   console.log(error);
      // }
    },
    [persons]
  );

  const handelOpenAdd = useCallback(() => {
    setIsOpen((prev) => !prev);
    setBlur((prev) => !prev);
  }, []);
  const handelBlur = useCallback(() => {
    setBlur((prev) => !prev);
  }, []);
  console.log("home");

  const handelDelete = useCallback((id: string) => {
    try {
      if (!window.confirm("are you sure want to delete this record!!!")) return;
      const filteredData = persons.filter((item) => item.id != id);
      setPersons(filteredData);
      toast.success("user deleted succesfully");
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handelUpdate = useCallback(
    (id: string, user: { name: string; age: number | null }) => {
      // try {
      //   const updatedUser = persons.map((item) =>
      //     item.id === id ? { id: id, name: user.name, age: user.age } : item
      //   );
      //   setPersons(updatedUser);
      //   toast.success("user deleted sucessfully");
      // } catch (error) {
      //   console.log(error);
      // }
    },
    [persons]
  );
  const counts = useMemo((): Counts => {
    const initialCounts: Counts = { teen: 0, adult: 0, old: 0 };
    const result = persons.reduce((acc, person) => {
      console.log("counting ages");
      if (person.age !== null) {
        if (person.age < 18) {
          acc.teen += 1;
        } else if (person.age >= 18 && person.age < 60) {
          acc.adult += 1;
        } else {
          acc.old += 1;
        }
      }
      return acc;
    }, initialCounts);
    return result;
  }, [persons]);
  useEffect(() => {
    if (query.status) {
      setPersons(query.arr);
    } else {
      const saved = localStorage.getItem("persons");
      setPersons(saved ? JSON.parse(saved) : []);
    }
  }, []);

  const handleSearch = (query: string, arr: User[]) => {
    try {
      const result = arr.filter((item) => {
        return item.name
          .toLowerCase()
          .concat(item.last_name.toLowerCase())
          .includes(query.toLowerCase());
      });
      setQuery((prev) => ({ ...prev, arr: result }));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const boxClasses =
    "flex flex-col items-center justify-center text-soft shadow-lg shadow-gray-600 hover:shadow-gray-600  duration-500 space-y-1 rounded-full border-2 size-16 lg:size-24 border-success";
  return (
    <>
      <div className="min-h-screen relative px-3 md:px-40 pt-6 bg-base-100">
        <div
          className={`absolute inset-0 ${
            blur ? "bg-black opacity-45" : ""
          } pointer-events-none`}
        ></div>

        <div className="md:px-20 px-16 flex flex-col justify-center items-center">
          <div className="mb-5">
            <div>
              <label className="input">
                <input
                  type="search"
                  value={query.name}
                  required
                  placeholder="Search"
                  onChange={(e) => {
                    if (e.target.value.length === 0) {
                      setQuery({ name: "", status: false, arr: persons });
                      return;
                    }
                    setQuery((prev) => ({
                      ...prev,
                      name: e.target.value,
                      status: true,
                    }));
                    handleSearch(e.target.value, persons);
                  }}
                />
              </label>
            </div>
          </div>
          <div className="flex lg:gap-32 gap-4 text-xs lg:text-lg justify-center items-center mb-3 text-center w-[100%]">
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
            className="btn btn-success p-2 text-base duration-300 flex items-center justify-center rounded-lg"
            onClick={() => {
              navigate("/create");
              // handelOpenAdd();
            }}
          >
            {" "}
            <button className="">Add Data </button>
            <span className="size-4">
              <IoIosAddCircleOutline />
            </span>
          </div>
          <h1 className="text-lg font-bold mx-auto tracking-wide underline mt-2 ">
            Here's The Data <span className="">...</span>
          </h1>
          <div className="flex md:gap-8 gap-4 text-white text-center mt-2 text-l px-5">
            <h1 className="btn btn-success rounded-xl">S.NO</h1>
            <h1 className="btn btn-success rounded-xl">Name</h1>
            <h1 className="btn btn-success rounded-xl">Age</h1>
            <h1 className="btn btn-success rounded-xl">Category</h1>
          </div>
          <div className="max-w-screen-lg">
            {query.status ? (
              <div>
                {query.arr.map((item, index) => (
                  <div
                    key={index + 1}
                    className="mt-8 shadow-md shadow-gray-600 "
                  >
                    <TableRow
                      data={item}
                      fullName={item.name + " " + item.last_name}
                      index={index + 1}
                      handelDelete={handelDelete}
                      handelUpdate={handelUpdate}
                      setBlur={handelBlur}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {persons.map((item, index) => (
                  <div
                    key={index + 1}
                    className="mt-8 shadow-md shadow-gray-600 "
                  >
                    <TableRow
                      data={item}
                      fullName={item.name}
                      index={index + 1}
                      handelDelete={handelDelete}
                      handelUpdate={handelUpdate}
                      setBlur={handelBlur}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {isOpen && (
          <div className="absolute top-[20%] z-10 lg:left-[35%] left-[20%] shadow-2xl shadow-gray-900">
            {/* <AddUsers
              open={handelOpenAdd}
              handelAdd={handelAdd}
              setBlur={setBlur}
            /> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
