import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { searchAsyncUsers } from "../../toolkit/users/usersSlice";

const Nav = () => {
  const dispatch = useDispatch();
   const [searchInput, setSearchInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchAsyncUsers(searchInput));
    console.log(searchInput);
  };
 
  return (
    <div className="w-[100%] bg-slate-600 flex justify-around">
      <div className="relative flex gap-1 items-center dark:bg-gray-700 dark:border-gray-600">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              handleSubmit(e);
            }}
          />
        </form>
        <div className="">
          <Plus />
        </div>
      </div>
    </div>
  );
};

export default Nav;
