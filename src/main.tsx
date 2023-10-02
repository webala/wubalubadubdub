import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './componsents/Home/Home';
import Characters from './componsents/Characters/Characters';
import Locations from './componsents/Locations/Locations';
import Episodes from './componsents/Episodes/Episodes';
import { QueryClient, QueryClientProvider } from 'react-query';


const query = new QueryClient()

const router = createBrowserRouter([
     {
          path: "/",
          element: <Home />,
     },
     {
          path: "/characters",
          element: <Characters />,
     },
     {
          path: "/locations",
          element: <Locations />,
     },
     {
          path: "/episodes",
          element: <Episodes />,
     },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
      <QueryClientProvider client={query}>
         
            <RouterProvider router={router} />
         
      </QueryClientProvider>
   </React.StrictMode>
);
