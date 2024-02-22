import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs";

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
    console.log('fetchLoginMockToken: compareAuthData', compareAuthData)
    const token = bcrypt.hashSync(
      compareAuthData,
      import.meta.env.VITE_SALT_HASH_PASSWORD
    );
    console.log('fetchLoginMockToken: token', token)
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
      .addCase(fetchLoginMockToken.pending, (state) => {
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

      .addCase(fetchLogoutRemoveToken.fulfilled, (state) => {
        state.status = "succeeded";
        localStorage.removeItem("token");
      });
  },
});

// export const { reactionAdded } = AuthSlice.actions;

export default AuthSlice.reducer;

export const isSessionExpired = () => {
  const token = localStorage.getItem("token");
  console.log('token', token)
  if (!token) return true;
  const tokenList = localStorage.getItem("tokenList");
  console.log('tokenList', tokenList)
  if (!tokenList) return true;
  const expireAt = JSON.parse(tokenList)[token];
  if (!expireAt) return true;
  console.log('expireAt', expireAt)
  if (expireAt < new Date().getTime()) return true;
  console.log('expireAt < new Date().getTime()', expireAt < new Date().getTime())
  return false;
};
export const token = () => localStorage.getItem("token");
export const tokenList = () => JSON.parse(localStorage.getItem("tokenList") || "{}");
