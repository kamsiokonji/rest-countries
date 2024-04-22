import React from "react";
import Details from "./components/Details/Details";
import NotFound from "./components/NotFound/NotFound";
import AppLayout from "./components/AppLayout/AppLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cards from "./components/Cards/Cards";
import CountryPicker from "./components/CountryPicker/CountryPicker";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <CountryPicker /> },
        {
          path: "/country/:name",
          element: <Details />,
        },
      ],
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
