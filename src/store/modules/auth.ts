import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs";
import type { RootState } from "../index";

// TODO: waiting integrate with redux-persist

interface AuthState {
  token: string | null;
  tokenList: { [key: string]: number }; // Key: token string, Value: timestamp number of the token expiration
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface Login {
  username: string;
  password: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  token: null,
  tokenList: {},
  status: "idle",
  error: null,
};

export const fetchLoginMockToken = createAsyncThunk(
  "auth/loginMockToken",
  async (loginData: Login) => {
    const compareAuthData: string = loginData.username + loginData.password;
    const token = bcrypt.hashSync(
      compareAuthData,
      import.meta.env.VITE_SALT_HASH_PASSWORD
    );
    return token;
  }
);

export const fetchLogoutRemoveToken = createAsyncThunk(
  "auth/logoutRemoveToken",
  async (token: string | null) => {
    return token;
  }
);

export const AuthSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLoginMockToken.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLoginMockToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.token = action.payload;
        // state.tokenList = {
        //   ...state.tokenList,
        //   [action.payload]: expireAt,
        // };
        localStorage.setItem("token", action.payload);
        const expireAt: number =
          new Date().getTime() + (Number(import.meta.env.VITE_SESSION_EXPIRE) * 1000);
        const tokenList = { ...state.tokenList, [action.payload]: expireAt };
        localStorage.setItem("tokenList", JSON.stringify(tokenList));
      })
      .addCase(fetchLoginMockToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      .addCase(fetchLogoutRemoveToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        localStorage.removeItem("token");
      });
  },
});

// export const { reactionAdded } = AuthSlice.actions;

export default AuthSlice.reducer;

export const isSessionExpired = (state: RootState) => {
  const token = localStorage.getItem("token");
  if (!token) return true;
  const tokenList = localStorage.getItem("tokenList");
  if (!tokenList) return true;
  const expireAt = JSON.parse(tokenList)[token];
  if (!expireAt) return true;
  if (expireAt < new Date().getTime()) return true;
  return false;
};
export const token = (state: RootState) => localStorage.getItem("token");
export const tokenList = (state: RootState) => JSON.parse(localStorage.getItem("tokenList") || "{}");
