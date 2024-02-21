import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import routers from './routers';

import './App.css';

export const App: FC<{ name: string }> = () => {
  return <RouterProvider router={routers} />;
};
