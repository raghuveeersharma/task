import { useNavigate } from "react-router-dom";
import ThemeSelector from "./ThemeSelector.js";

const Navbar = () => {
  const navigate = useNavigate();
  console.log("navbar");
  return (
    <div className=" h-16 w-[100%] flex items-center navbar bg-success  shadow-gray-300">
      <div className="mx-auto w-[80%]">
        <div className="flex justify-between lg:gap-80 gap-10 md:gap-40 ">
          <div
            className="md:text-3xl text-xl tracking-wider font-bold"
            onClick={() => navigate("/")}
          >
            DataWala
          </div>
          <div>
            <ThemeSelector />
          </div>
          <a
            href="https://github.com/raghuveeersharma/task.git"
            target="__blank"
            className="btn btn-soft btn-accent md:text-xl text-lg"
          >
            <span>Github</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
