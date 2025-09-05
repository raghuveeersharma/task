const Navbar = () => {
  return (
    <div className=" h-16 flex items-center bg-green-500 px-10 text-white shadow-lg shadow-gray-300">
      <div className="mx-auto w-[90%]">
        <div className="flex justify-between gap-[80%] ">
          <div className="text-3xl tracking-wider font-bold">DataWala</div>
          <div className="underline text-xl link">Github</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
