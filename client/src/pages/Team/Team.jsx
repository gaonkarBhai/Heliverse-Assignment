import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncTeam, getAllTeams } from "../../toolkit/teams/teamslice";
import { Settings } from "lucide-react";

const Team = () => {
  const teams = useSelector(getAllTeams);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncTeam());
  }, [dispatch]);
  return (
    <>
      <div className="bg-gray">
        {teams.teams &&
          teams.teams.map((ele, i) => (
            <section key={i} className="bg-white dark:bg-gray-900">
              <div className="container px-6 py-10 mx-auto">
                <div className="text-center">
                  <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                    {ele.name}
                  </h1>
                </div>
                <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
                  {ele?.members?.map((user) => (
                    <div
                      key={user.id}
                      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div className="flex justify-end px-4 pt-4">
                        <span class="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                          {user.email}
                        </span>
                      </div>
                      <div className="flex flex-col items-center pb-10">
                        <img
                          className="w-24 h-24 mb-3 rounded-full shadow-lg"
                          src={user.avatar}
                          alt={user.first_name}
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                          {user.first_name} {user.last_name}
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {user.domain}
                        </span>
                        <div className="flex mt-4 md:mt-6">
                          <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            {user.gender}
                          </span>
                          <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                            {user.available ? "Available" : "Not Available"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
      </div>
    </>
  );
};

export default Team;
