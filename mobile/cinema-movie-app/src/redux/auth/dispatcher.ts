import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../services/auth/auth.service";
import { ActionType, LoginInfo } from "./type";

const loginAsync = createAsyncThunk(
  ActionType.LOGIN,
  async (arg: LoginInfo, { rejectWithValue }) => {
    try {
      return await UserService.login(arg);
    } catch (error: any) {
      // if (error) {
      //   if (error.response) {
      //     return rejectWithValue(error.response.data.errors);
      //   }
      // }

      return rejectWithValue([
        {
          errorMessage: "Email hoặc password không chính xác.",
        },
      ]);
    }
  }
);

export { loginAsync };
