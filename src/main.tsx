import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import MainRoutes from "./mainRoutes.tsx";
import { store } from "./app/store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={MainRoutes} />
    </Provider>
  </React.StrictMode>,
);
