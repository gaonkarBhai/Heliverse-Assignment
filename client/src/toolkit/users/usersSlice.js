import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  allUsers: [],
};

export const fetchAsyncUsers = createAsyncThunk(
  "users/fetchAsyncUsers",
  async () => {
    const { data } = await axios.get(`/api/users`);
    console.log(data);
    return data.users;
  }
);

export const searchAsyncUsers = createAsyncThunk(
  "users/searchAsyncUsers",
  async (searchInput, { getState }) => {
    const allUsers = getState().users.allUsers; // Access allUsers from the state
    if (searchInput === "") return allUsers;

    const lowerSearchInput = searchInput.toLowerCase();

    const filteredUsers = allUsers.filter(
      (user) =>
        user.first_name.toLowerCase().includes(lowerSearchInput) ||
        user.last_name.toLowerCase().includes(lowerSearchInput)
    );

    console.log(filteredUsers);
    return filteredUsers;
  }
);


export const deleteAsyncUser = createAsyncThunk(
  "users/deleteAsyncUsers",
  async (user) => {
    const { data } = await axios.delete(`/api/users/${user._id}`);
    console.log(data);
    return data;
  }
);

export const updateAsyncUser = createAsyncThunk(
  "users/updateAsyncUsers",
  async (user) => {
    const { data } = await axios.put(`/api/users/${user._id}`,user);
    console.log(data);
    return data;
  }
);



const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
      state.allUsers = action.payload;
    },
    deleteUser(state, action) {
      state.users = action.payload;
      state.allUsers = action.payload;
    },
    updateUser(state, action) {
      state.users = action.payload;
      state.allUsers = action.payload;
    },
    searchUser(state, action) {
      state.users = action.payload;
    },

  },
  extraReducers: {
    [fetchAsyncUsers.pending]: () => {
      console.log("pending");
    },
    [fetchAsyncUsers.fulfilled]: (state, { payload }) => {
      console.log("users fetched successfully");
      return { ...state, users: payload, allUsers: payload };
    },
    [fetchAsyncUsers.rejected]: () => {
      console.log("rejected");
    },
    [deleteAsyncUser.fulfilled]: () => {
      console.log("user deleted successfully");
    },
    [updateAsyncUser.fulfilled]: () => {
      console.log("user updated successfully");
    },

    [searchAsyncUsers.fulfilled]: (state, { payload }) => {
      console.log("user search successfully");
      return { ...state, users: payload };
    },
  },
});

export const { setUsers, deleteUser,updateUser,searchUser } = usersSlice.actions;
export const getAllUsers = (state) => state.users.users;
export default usersSlice.reducer;
