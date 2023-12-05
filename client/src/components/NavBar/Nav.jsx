import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAsyncUsers,
  searchAsyncUsers,
  setUsers,
} from "../../toolkit/users/usersSlice";
import { Button, Typography } from "antd";
import CreateTeam from "../createTeam/CreateTeam";
import { Link } from "react-router-dom";
import { Search, Users } from "lucide-react";

const Nav = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput === "") {
      dispatch(fetchAsyncUsers());
    } else {
      dispatch(searchAsyncUsers(searchInput));
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);

    // If you want to fetch data on every keystroke, you can dispatch the action here
    if (input === "") {
      dispatch(fetchAsyncUsers());
    } else {
      dispatch(searchAsyncUsers(input));
      // dispatch(setUsers(data.users));
    }
  };
  return (
    <div className=" bg-slate-600  p-3">
      <div className="relative flex flex-wrap justify-between gap-1 items-center  dark:border-gray-600">
        <div class="md:flex hidden absolute inset-y-0 start-0 items-center ps-3 pointer-events-none">
          <Search />
        </div>

        <form onSubmit={handleSubmit} className="">
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            value={searchInput}
            onChange={handleInputChange}
          />
        </form>
        <CreateTeam />
        <Typography>
          <Link to="/team">
            <Button className="flex gap-1">
              <Users />
              Teams
            </Button>
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default Nav;
