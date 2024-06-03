import { Routes, Route, createBrowserRouter, Navigate } from "react-router-dom";

import Character from "./widgets/Item/Character";
import Episode from "./widgets/Item/Episode";
import Location from "./widgets/Item/Location";
import ItemSearch from "./widgets/ItemSearch/ItemSearch";
import App from "./app/App";
import CharSearch from "./widgets/ItemSearch/CharSearch";
import PlaceSearch from "./widgets/ItemSearch/PlaceSearch";
import EpisodeSearch from "./widgets/ItemSearch/EpisodeSearch";

const MainRoutes = createBrowserRouter([
  {
    path: "*",
    element: (
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ItemSearch />} />
          <Route path="episode">
            <Route index element={<EpisodeSearch />} />
            <Route path=":id" element={<Episode />} />
          </Route>
          <Route path="character">
            <Route index element={<CharSearch />} />
            <Route path=":id" element={<Character />} />
          </Route>
          <Route path="location">
            <Route index element={<PlaceSearch />} />
            <Route path=":id" element={<Location />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    ),
  },
]);

export default MainRoutes;
