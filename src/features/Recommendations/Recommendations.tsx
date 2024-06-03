import { FC } from "react";

import ItemList from "../../shared/ItemList/ItemList";
import { ILocation } from "../../types/location/locationDTO";
import { IEpisode } from "../../types/episode/episodeDTO";
import { ICharacter } from "../../types/character/characterDTO";

interface RecommendationsProps {
  label: string;
  items: ICharacter[] | IEpisode[] | ILocation[];
}

const Recommendations: FC<RecommendationsProps> = ({ label, items }) => {
  return (
    <aside>
      <h4>{label}</h4>
      <ItemList items={items || []} />
    </aside>
  );
};

export default Recommendations;
