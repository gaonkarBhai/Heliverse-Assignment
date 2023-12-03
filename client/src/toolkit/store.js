import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./users/usersSlice";
import teamReducer from "./teams/teamslice";

export const store = configureStore({
  reducer: { users: userReducer, teams: teamReducer },
});
