import { Error } from "../types";
import { loginAsync } from "./dispatcher";
import { UserInfo, UserState } from "./type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  user: {
    accessToken:
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgyNzgzMDg0LCJleHAiOjE2ODM2NDcwODR9.o79FGTqUDA8xXZh9Wttwpkl5LJzaawGJojBlZX-uFzaZIA9sAbuWjS70oT8S0es2cOErDPUvsg6gl4HnWgECVA",
    user: {
      id: "1",
      displayName: "Nguyen Van Sy",
      email: "admin@gmail.com",
      roles: ["ROLE_MODERATOR", "ROLE_USER"],
    },
  },
  errors: [],
  // user: {
  //   accessToken: "",
  //   user: {
  //     id: "",
  //     displayName: "",
  //     email: "",
  //     roles: [],
  //   },
  // },
  // errors: [],
};

const userSlice = createSlice({
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.errors = [];
    },
  },
  name: "user",
  extraReducers(builder) {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.user = action.payload as unknown as UserInfo;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.errors = action.payload as Error[];
    });
  },
});

const userReducer = userSlice.reducer;
const { logoutAction } = userSlice.actions;
export { userReducer, logoutAction };
