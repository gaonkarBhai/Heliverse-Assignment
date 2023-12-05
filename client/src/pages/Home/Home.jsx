import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Input,
  Modal,
  Pagination,
  Radio,
  Switch,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAsyncUser,
  fetchAsyncUsers,
  fetchAsyncUsersQuery,
  getAllUsers,
  setUsers,
  updateAsyncUser,
} from "../../toolkit/users/usersSlice";
import "./homeStyles.css";
import { Settings } from "lucide-react";
import Nav from "../../components/NavBar/Nav";

const Home = () => {
  const users = useSelector(getAllUsers);
  const [selectedDomain, setSelectedDomain] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const dispatch = useDispatch();
  const [modals, setModals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    dispatch(fetchAsyncUsers());
  }, [dispatch]);

  useEffect(() => {
    // Update displayUsers when filters change
    if (!users) return;
    setDisplayUsers(users);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [users]);

  useEffect(() => {
    // console.log(selectedDomain, selectedGender, selectedAvailability);
    dispatch(
      fetchAsyncUsersQuery({
        selectedDomain,
        selectedGender,
        selectedAvailability,
      })
      );
      setDisplayUsers(users);
      setCurrentPage(1); 
  }, [selectedDomain, selectedGender, selectedAvailability]);
  const paginatedUsers = displayUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleUserClick = (user) => {
    setModals((prevModals) => [
      ...prevModals,
      { user, isVisible: true, data: { ...user } },
    ]);
  };

  const handleUpdate = (modalIndex) => {
    const updatedUser = modals[modalIndex].data;
    dispatch(updateAsyncUser(updatedUser));
    // Set the modal's visibility to false
    setModals((prevModals) => {
      const updatedModals = [...prevModals];
      updatedModals[modalIndex].isVisible = false;
      return updatedModals;
    });
    // Update the user's information in the local state to reflect the changes
    const updatedUsers = users.map((user) => {
      if (user._id === updatedUser._id) {
        return updatedUser;
      }
      return user;
    });
    dispatch(setUsers(updatedUsers));
    // console.log(modals[modalIndex].data);
  };

  const handleDelete = (modalIndex) => {
    const userToDelete = modals[modalIndex].data;

    // Dispatch the deleteAsyncUser action directly
    dispatch(deleteAsyncUser(userToDelete));

    // Set the modal's visibility to false
    setModals((prevModals) => {
      const updatedModals = [...prevModals];
      updatedModals[modalIndex].isVisible = false;
      return updatedModals;
    });
    // Remove the deleted user from the users array
    const updatedUsers = users.filter((user) => user._id !== userToDelete._id);
    dispatch(setUsers(updatedUsers));
    // console.log(userToDelete);
  };

  const handleClose = (modalIndex) => {
    setModals((prevModals) => {
      const updatedModals = [...prevModals];
      updatedModals[modalIndex].isVisible = false;
      return updatedModals;
    });
  };

  const handleInputChange = (modalIndex, field, value) => {
    setModals((prevModals) => {
      const updatedModals = [...prevModals];
      updatedModals[modalIndex].data[field] = value;
      return updatedModals;
    });
  };

  const handleCheckboxChange = (filterType, value) => {
    switch (filterType) {
      case "domain":
        setSelectedDomain(value);
        break;
      case "gender":
        setSelectedGender(value);
        break;
      case "availability":
        setSelectedAvailability(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Nav />

      <div className="flex justify-between p-3 rounded bg-slate-500 m-1">
        <Checkbox.Group
          onChange={(values) => handleCheckboxChange("domain", values)}
        >
          <Checkbox value="Management">Management</Checkbox>
          <Checkbox value="UI Designing">UI Designing</Checkbox>
          <Checkbox value="Sales">Sales</Checkbox>
          <Checkbox value="Finance">Finance</Checkbox>
          <Checkbox value="IT">IT</Checkbox>
          <Checkbox value="Marketing">Marketing</Checkbox>
        </Checkbox.Group>
        <Checkbox.Group
          onChange={(values) => handleCheckboxChange("gender", values)}
        >
          <Checkbox value="Male">Male</Checkbox>
          <Checkbox value="Female">Female</Checkbox>
          {/* Add more checkboxes for genders */}
        </Checkbox.Group>
        <Checkbox.Group
          onChange={(values) => handleCheckboxChange("availability", values)}
        >
          <Checkbox value={true}>Available</Checkbox>
          <Checkbox value={false}>Not Available</Checkbox>
        </Checkbox.Group>
      </div>

      <div className="grid grid-cols-1 gap-1 place-items-center md:pt-4 md:grid-cols-4 items-center xl:grid-cols-4 bg-slate-500">
        {paginatedUsers &&
          paginatedUsers.map((user, index) => (
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
                  <Settings />
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
      <div className="flex justify-center p-4  bg-slate-500">
        <Pagination
          current={currentPage}
          total={displayUsers.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
      {modals.map((modal, index) => (
        <Modal
          key={index}
          title="User Details"
          open={modal.isVisible}
          onCancel={() => handleClose(index)}
          footer={
            <>
              <Button onClick={() => handleDelete(index)} danger>
                Delete
              </Button>
              <Button onClick={() => handleUpdate(index)}>Update</Button>
            </>
          }
        >
          {modal.data && (
            <Flex vertical gap={16}>
              <div>
                <Typography>First Name</Typography>
                <Input
                  defaultValue={modal.data.first_name}
                  onChange={(e) =>
                    handleInputChange(index, "first_name", e.target.value)
                  }
                />
              </div>
              <div>
                <Typography>Last Name</Typography>
                <Input
                  defaultValue={modal.data.last_name}
                  onChange={(e) =>
                    handleInputChange(index, "last_name", e.target.value)
                  }
                />
              </div>
              <div>
                <Typography>Domain</Typography>
                <Input
                  defaultValue={modal.data.domain}
                  onChange={(e) =>
                    handleInputChange(index, "domain", e.target.value)
                  }
                />
              </div>
              <div>
                <Typography>Email</Typography>
                <Input
                  defaultValue={modal.data.email}
                  onChange={(e) =>
                    handleInputChange(index, "email", e.target.value)
                  }
                />
              </div>
              <div>
                <Typography>Gender</Typography>
                <Radio.Group
                  defaultValue={modal.data.gender}
                  onChange={(e) =>
                    handleInputChange(index, "gender", e.target.value)
                  }
                >
                  <Radio value={"Male"}>Male</Radio>
                  <Radio value={"Female"}>Female</Radio>
                  <Radio value={"Agender"}>Agender</Radio>
                  <Radio value={"Bigender"}>Bigender</Radio>
                  <Radio value={"Polygender"}>Polygender</Radio>
                  <Radio value={"Non-binary"}>Non-binary</Radio>
                  <Radio value={"Genderfluid"}>Genderfluid</Radio>
                  <Radio value={"Genderqueer"}>Genderqueer</Radio>
                </Radio.Group>
              </div>
              <div>
                <Typography>Available</Typography>
                <Switch
                  checked={modal.data.available}
                  checkedChildren="Available"
                  unCheckedChildren="Not Available"
                  onChange={(e) =>
                    handleInputChange(index, "available", !modal.data.available)
                  }
                />
              </div>
            </Flex>
          )}
        </Modal>
      ))}
    </>
  );
};

export default Home;
