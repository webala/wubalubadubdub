import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./componsents/Home/Home";
import Characters from "./componsents/Characters/Characters";
import Locations from "./componsents/Locations/Locations";
import Episodes from "./componsents/Episodes/Episodes";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./componsents/Layout";

const query = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/episodes" element={<Episodes />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
