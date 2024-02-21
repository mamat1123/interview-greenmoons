import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setFavMovies, selectFavMovieData } from "../store/modules/movies";

import { token } from "../store/modules/auth";

import CardMovie from "../components/CardMovie";
import ModalMovieDetail from "../components/ModalMovieDetail";


const MovieFavListPage = () => {
  const [open, setOpen] = React.useState(false);
  const [movieSelected, setMovieSelected] = React.useState({});

  const dispatch = useAppDispatch();
  const tokenData = useAppSelector(token);
  const favMovies = useAppSelector((state) =>
    selectFavMovieData(state, tokenData)
  );

  const onFavMovieClick = (id: number, isFav: boolean) => {
    dispatch(setFavMovies({ id, isFav, token: tokenData }));
  };
  const onCardClick = (id: number) => {
    const movie = favMovies.find((movie: { id: number }) => movie.id === id);
    setMovieSelected({ ...movie, isFav: true });
    setOpen(true);
  };

  let content;
  if (favMovies.length > 0) {
    content = (
      <Grid container spacing={2}>
        {favMovies.map(
          (
            movie: { id: number; poster_url: string },
            index: React.Key | null | undefined
          ) => (
            <Grid xs={12} sm={6} md={4} key={index}>
              <CardMovie
                id={movie.id}
                image={movie.poster_url}
                onCardClick={onCardClick}
              />
            </Grid>
          )
        )}
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
  } else {
    content = <Typography variant="h5" >Not have any Favorite movie</Typography>;
  }

  return <Box sx={{ flexGrow: 1 }}>{content}</Box>;
};

export default MovieFavListPage;
