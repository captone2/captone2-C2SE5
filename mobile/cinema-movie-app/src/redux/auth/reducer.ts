import { Error } from "../types";
import { getAccountById, loginAsync } from "./dispatcher";
import { UserInfo, UserState } from "./type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  // user: {
  //   accessToken:
  //     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgyNzgzMDg0LCJleHAiOjE2ODM2NDcwODR9.o79FGTqUDA8xXZh9Wttwpkl5LJzaawGJojBlZX-uFzaZIA9sAbuWjS70oT8S0es2cOErDPUvsg6gl4HnWgECVA",
  //   user: {
  //     id: 2,
  //     displayName: "Nguyen Van Sy",
  //     email: "admin@gmail.com",
  //     roles: ["ROLE_MODERATOR", "ROLE_USER"],
  //   },
  //   userCurrent: null,
  // },
  // errors: [],
  user: {
    accessToken: "",
    user: {
      id: 0,
      displayName: "",
      email: "",
      roles: [],
    },
    userCurrent: {
      accountCode: "",
      address: "",
      birthday: "",
      createAt: "",
      email: "",
      enabled: false,
      fullname: "",
      gender: false,
      id: 0,
      idCard: "",
      imageUrl: "",
      password: "",
      phone: "",
      provider: "",
      totalPoint: 0,
      username: "",
      verificationCode: "",
    },
  },
  errors: [],
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
    builder.addCase(getAccountById.fulfilled, (state, action) => {
      state.user.userCurrent = action.payload;
    });
  },
});

const userReducer = userSlice.reducer;
const { logoutAction } = userSlice.actions;
export { userReducer, logoutAction };
