import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

import VolumeMuteRoundedIcon from "@mui/icons-material/VolumeMuteRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  maxWidth: 850,
  maxHeight: 700,
  width: "100%",
  boxShadow: 24,
  overflow: "scroll",
};

export default function ModalMovieDetail(props: any) {
  const { movie } = props;
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(props.movie.isFav);
  const movieType = movie.genre.replaceAll("/", ", ");
  const actor = movie.actor.replaceAll("/", ", ");

  const toggleSynopsis = () => {
    setShowFullSynopsis(!showFullSynopsis);
  };

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  const toggleFavorite = () => {
    props.onFavMovieClick(movie.id, !isFavorite);
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <Box sx={style}>
        <Card>
          <div style={{ position: "relative" }}>
            <CardMedia
              component="video"
              src={movie.tr_mp4}
              autoPlay
              muted={isMuted}
            />
            <div
              style={{
                position: "absolute",
                bottom: 20,
                zIndex: 1,
                right: 20,
              }}
            >
              <IconButton
                style={{ border: "2px solid white", marginRight: 24 }}
                edge="start"
                onClick={toggleSound}
              >
                {isMuted ? <VolumeOffRoundedIcon /> : <VolumeMuteRoundedIcon />}
              </IconButton>
              <IconButton
                style={{ border: "2px solid white" }}
                edge="start"
                onClick={toggleFavorite}
              >
                {isFavorite ?  <FavoriteRoundedIcon sx={{color: "red"}}/> : <FavoriteBorderRoundedIcon />}
              </IconButton>
            </div>
          </div>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.title_th} | {movie.title_en}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {showFullSynopsis
                    ? movie.synopsis_th
                    : `${movie.synopsis_th.substring(0, 250)}...`}
                  <Button onClick={toggleSynopsis} size="small">
                    {showFullSynopsis ? "See Less" : "See More"}
                  </Button>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2">
                  <span style={{ color: "#777" }}>Movie Type:</span> {movieType}
                </Typography>
                <Typography variant="body2">
                  <span style={{ color: "#777" }}>Actor:</span> {actor}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </Box>
    </div>
  );
}
