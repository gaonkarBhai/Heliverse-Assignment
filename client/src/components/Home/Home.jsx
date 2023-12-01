import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Flex, Input, Modal, Pagination, Radio, Switch, Typography } from "antd";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(`/api/users`);
      setUsers(data.users);
      console.log(data);
    };
    fetchUsers();
  }, []);
  const displayUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const handleUserClick = (user) => {
    setSelectedUser(user);
    // Open the modal
    setShowModel(true);
  };
  const handleUpdate = ()=>{
    console.log(selectedUser);
  }
  return (
    <>
      <div className="grid grid-cols-4 gap-2 m-3">
        {displayUsers &&
          displayUsers.map((user) => (
            <div
              key={user.id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex justify-end px-4 pt-4">
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                  type="button"
                  onClick={() => handleUserClick(user)}
                >
                  <span className="sr-only">Open dropdown</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
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
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add friend
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
                  >
                    Message
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={users.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
      <Modal
        title="User Details"
        open={showModel}
        onCancel={() => setShowModel(false)}
        footer={
          <>
            <Button color="red">Delete</Button>
            <Button color="green" onClick={handleUpdate}>
              Update
            </Button>
          </>
        }
      >
        {selectedUser && (
          <Flex vertical gap={16}>
            <div>
              <Typography>First Name</Typography>
              <Input
                defaultValue={selectedUser.first_name}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    first_name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Typography>Last Name</Typography>
              <Input
                defaultValue={selectedUser.last_name}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    last_name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Typography>Domain</Typography>
              <Input
                defaultValue={selectedUser.domain}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    domain: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Typography>Gendre</Typography>
              <Radio.Group>
                <Radio value={1}>Male</Radio>
                <Radio value={2}>Female</Radio>
              </Radio.Group>
            </div>
            <div>
              <Typography>Available</Typography>
              <Switch
                // checked={input}
                checkedChildren="Available"
                unCheckedChildren="Not Available"
                // onChange={() => {
                //   setInput(!input);
                // }}
              />
            </div>
          </Flex>
        )}
      </Modal>
    </>
  );
};

export default Home;
