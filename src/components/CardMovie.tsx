import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

interface CardMovieProps {
  image: string;
  id: number;
  onCardClick: (id: number) => void;
}

export default function CardMovie(props: CardMovieProps) {
  const { image, id, onCardClick } = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          onClick={() => onCardClick(id)}
          sx={{
            transition: "transform .8s",
            "&:hover": { transform: "scale(1.1)" },
          }}
          component="img"
          height="540"
          image={image}
          alt="green iguana"
        />
      </CardActionArea>
    </Card>
  );
}
