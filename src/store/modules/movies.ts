import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../index";

// Define a type for the slice state
// TODO: waiting integrate with redux-persist
interface MovieState {
  movies: Array<any>;
  favMovies: { [key: string]: Array<number> };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface Movie {
  image: string;
}

interface CreateFavMovie {
  id: number;
  token: string | null;
  isFav: boolean;
}

// Define the initial state using that type
const initialState: MovieState = {
  movies: [],
  favMovies: {},
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get(
    import.meta.env.VITE_API_URL + "apis/get_movie_avaiable"
  );
  return response.data.movies;
});

export const setFavMovies = createAsyncThunk(
  "movies/setFavMovies",
  async (favData: CreateFavMovie) => {
    // TODO: call real API for set fav movies
    return favData;
  }
);

export const MoviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.movies.find((movie) => movie.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
        localStorage.setItem("movies", JSON.stringify(action.payload));
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      .addCase(setFavMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { token, id, isFav } = action.payload;
        if (token === null) return;
        let favMovies = JSON.parse(localStorage.getItem("favMovies") || "{}");
        favMovies = {
          ...favMovies,
          [token]: isFav
            ? [...(favMovies[token] || []), id]
            : favMovies[token]?.filter((movie: number) => movie !== id),
        };
        // state.favMovies = {
        //   ...state.favMovies,
        //   [token]: isFav
        //     ? [...(state.favMovies[token] || []), id]
        //     : state.favMovies[token]?.filter((movie) => movie !== id),
        // };
        localStorage.setItem("favMovies", JSON.stringify(favMovies));
      });
  },
});

export const { reactionAdded } = MoviesSlice.actions;

export default MoviesSlice.reducer;

export const selectAllMovies = (state: RootState) => state.movies.movies;
export const selectMovieById = (state: RootState, id: number) =>
  state.movies.movies.find((movie) => movie.id === id);

export const selectFavMoviesByToken = (
  state: RootState,
  token: string | null
) => {
  if (!token) return [];
  const favMovies = JSON.parse(localStorage.getItem("favMovies") || "{}");
  return favMovies[token] || [];
}

export const selectFavMovieData = (state: RootState, token: string | null) => {
  if (!token) return [];
  const movies = JSON.parse(localStorage.getItem("movies") || "[]");
  return movies.filter((movie: { id: number; }) => selectFavMoviesByToken(state, token).includes(movie.id));
};
