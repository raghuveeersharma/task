import { useEffect, useMemo, useState } from "react";
import TableRow from "../components/TableRow.js";
import { IoIosAddCircleOutline } from "react-icons/io";
import type { User, Counts, query } from "../constants/types.js";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../utils/user.utlis.js";

const Home = () => {
  const [persons, setPersons] = useState<User[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      getUsers()?.then((p) => setPersons(p?.data.users));
    } catch (error) {
      console.log("error in fetching user", error);
    }
  }, []);
  const [query, setQuery] = useState<query>({
    name: "",
    status: false,
    arr: persons || [],
  });

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

  const handleSearch = (query: string, arr: User[]) => {
    try {
      const result = arr.filter((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase());
      });
      setQuery((prev) => ({ ...prev, arr: result }));
      console.log("result", result);
    } catch (error) {
      console.log(error);
    }
  };

  const boxClasses =
    "flex flex-col items-center justify-center text-soft shadow-lg shadow-gray-600 hover:shadow-gray-600  duration-500 space-y-1 rounded-full border-2 size-16 lg:size-24 border-success";
  return (
    <>
      <div className="min-h-screen relative px-3 pt-6 bg-base-100 border">
        <div className=" px-2 flex flex-col justify-center items-center">
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
          <div className="flex lg:gap-32 gap-4 text-xs lg:text-lg justify-center items-center mb-3 text-center">
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
          <div className="flex md:gap-16 gap-4 text-white text-center mt-2 text-l px-5">
            <h1 className="btn btn-success rounded-xl">S.NO</h1>
            <h1 className="btn btn-success rounded-xl">Name</h1>
            <h1 className="btn btn-success rounded-xl">Age</h1>
            <h1 className="btn btn-success rounded-xl">Category</h1>
          </div>
          <div>
            {
              <div>
                {(query.status ? query.arr : persons).map((item, index) => (
                  <div
                    key={index + 1}
                    className="mt-8 shadow-md shadow-gray-600 "
                  >
                    <TableRow
                      data={item}
                      fullName={item.name}
                      index={index + 1}
                    />
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
