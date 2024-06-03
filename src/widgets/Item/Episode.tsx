import { useParams } from "react-router-dom";

import { useGetEpisodeQuery } from "../../services/episode/episode.api";
import { Params } from "../../types/router/routerTypes";
import { useGetCharactersByIdQuery } from "../../services/character/character.api";
import { CV, getId } from "../../utils/utils";
import Recommendations from "../../features/Recommendations/Recommendations";

import styles from "./Item.module.scss";

const Episode = () => {
  const { id } = useParams<keyof Params>() as Params;
  const { data, isFetching } = useGetEpisodeQuery(id!);
  const charactersIds = data?.characters.map(getId);
  const { data: characters } = useGetCharactersByIdQuery(charactersIds!, {
    skip: !charactersIds,
  });

  return (
    <>
      {isFetching && <h2>Loading...</h2>}
      {data && !isFetching ? (
        <div className={CV(styles.container, styles["container--wo-image"])}>
          <div>
            <h1>{data.name}</h1>
            <h3>{data.air_date}</h3>
          </div>

          {characters ? (
            <Recommendations
              label="Features these characters: "
              items={characters}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Episode;
