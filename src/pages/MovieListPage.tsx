import React, { useEffect } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Modal from "@mui/material/Modal";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  fetchMovies,
  setFavMovies,
  selectAllMovies,
  selectFavMoviesByToken,
} from "../store/modules/movies";

import { token } from "../store/modules/auth";

import CardMovie from "../components/CardMovie";
import ModalMovieDetail from "../components/ModalMovieDetail";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MovieListPage = () => {
  const [open, setOpen] = React.useState(false);
  const [movieSelected, setMovieSelected] = React.useState({});

  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectAllMovies);
  const tokenData = useAppSelector(token);
  const selectFavMoviesByTokenData = useAppSelector((state) =>
    selectFavMoviesByToken(state, tokenData)
  );

  const moviesStatus = useAppSelector((state) => state.movies.status);
  const error = useAppSelector((state) => state.movies.error);

  const onFavMovieClick = (id: number, isFav: boolean) => {
    dispatch(setFavMovies({ id, isFav, token: tokenData }));
  };
  const onCardClick = (id: number) => {
    const movie = movies.find((movie) => movie.id === id);
    const isFavMovie = selectFavMoviesByTokenData.includes(id);
    setMovieSelected({...movie, isFav: isFavMovie});
    setOpen(true);
  };

  useEffect(() => {
    if (moviesStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [moviesStatus, dispatch]);

  let content;

  if (moviesStatus === "loading") {
    content = <CircularProgress />
  } else if (moviesStatus === "succeeded") {
    content = (
      <Grid container spacing={2}>
        {movies.map((movie, index) => (
          <Grid xs={12} sm={6} md={4} key={index}>
            <CardMovie
              id={movie.id}
              image={movie.poster_url}
              onCardClick={onCardClick}
            />
          </Grid>
        ))}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <ModalMovieDetail
              movie={movieSelected}
              onFavMovieClick={onFavMovieClick}
            />
          </div>
        </Modal>
      </Grid>
    );
  } else if (moviesStatus === "failed") {
    content = <Typography variant="h5" >{error}</Typography>;
  }

  return <Box sx={{ flexGrow: 1 }}>{content}</Box>;
};

export default MovieListPage;
