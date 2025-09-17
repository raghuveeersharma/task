import { createBrowserRouter } from "react-router-dom";
import App from "./App.js";
import Home from "./screens/Home.js";
import RowDetail from "./screens/RowDetail.js";
import CreateEntry from "./screens/CreateEntry.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "detail/:id",
        element: <RowDetail />,
      },
      { path: "create", element: <CreateEntry /> },
    ],
  },
]);

export default router;
