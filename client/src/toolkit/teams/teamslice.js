import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  teams: [],
};

export const fetchAsyncTeam = createAsyncThunk(
  "users/fetchAsyncUsers",
  async () => {
    const { data } = await axios.get(`/api/team`);
    console.log(data);
    console.log(data.team);
    return data.team;
  }
);

export const createAsyncTeam = createAsyncThunk(
  "team/createAsyncteam",
  async (teamObj) => {
    const { data } = await axios.post(`/api/team/`, teamObj);
    console.log(data);
    return data;
  }
);

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    createTeam(state, action) {
      state.teams = action.payload;
    },
    setTeam(state, action) {
      state.teams = action.payload;
    },
  },
  extraReducers: {
    [createAsyncTeam.fulfilled]: () => {
      console.log("team created successfully");
    },
    [fetchAsyncTeam.fulfilled]: (state, { payload }) => {
      console.log("team fetched successfully");
      return { ...state, teams: payload };
    },
  },
});

export const { createTeam, setTeam } = teamSlice.actions;
export const getAllTeams = (state) => state.teams;
export default teamSlice.reducer;