import { Routes, Route, createBrowserRouter } from "react-router-dom";
import App from "./app/App";
import ItemList from "./widgets/ItemList/ItemList";
import Item from "./widgets/Item/Item";

const MainRoutes = createBrowserRouter([
  {
    path: "*",
    element: (
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="episodes" element={<ItemList />} />
        <Route path="characters" element={<ItemList />} />
        <Route path="locations" element={<ItemList />} />
        <Route path="episode/*" element={<Item />} />
        <Route path="charatcer/*" element={<Item />} />
        <Route path="location/*" element={<Item />} />
      </Routes>
    ),
  },
]);

export default MainRoutes;
