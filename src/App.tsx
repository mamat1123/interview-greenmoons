import { FC } from 'react';
import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import routers from './routers';

import './App.css';

export const App: FC<{ name: string }> = ({ name }) => {
  return <RouterProvider router={routers} />;
};
