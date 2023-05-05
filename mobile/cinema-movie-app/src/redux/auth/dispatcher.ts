import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UserService } from "../../services/auth/auth.service";
import { ResponseError } from "../types";
import { ActionType, LoginInfo } from "./type";

const loginAsync = createAsyncThunk(
  ActionType.LOGIN,
  async (arg: LoginInfo, { rejectWithValue }) => {
    try {
      return await UserService.login(arg);
    } catch (error: any) {
      if (error) {
        if (error.response) {
          return rejectWithValue(error.response.data.errors);
        }
      }

      return rejectWithValue([
        {
          errorCode: "messages.error.unexpected",
        },
      ]);
    }
  }
);

export { loginAsync };
