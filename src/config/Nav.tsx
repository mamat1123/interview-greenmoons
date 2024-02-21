import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

export const Type = [
  {
    name: 'Movie Finder',
    icon: <MovieCreationRoundedIcon/>,
    path: '/'
  },
  {
    name: 'My Favorite',
    icon: <FavoriteRoundedIcon/>,
    path: '/fav'
  },
  {
    name: 'Logout',
    icon: <ExitToAppRoundedIcon/>,
    path: '',
  },
]