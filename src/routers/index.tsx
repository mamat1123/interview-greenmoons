import { createBrowserRouter } from 'react-router-dom';
import NoPage from '../pages/NoPage';
import LoginPage from '../pages/LoginPage';
import MovieListPage from '../pages/MovieListPage';
import MovieFavListPage from '../pages/MovieFavListPage';

import ProtectedRoutes from '../routers/ProtectedRoute'



const routers = createBrowserRouter([
  {
    path: '*',
    element: <NoPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoutes />,
    children: [
      {
        index: true,
        element: <MovieListPage />,
      },
      {
        path: 'fav',
        element: <MovieFavListPage />,
      },
    ],
  },
]);


export default routers;
