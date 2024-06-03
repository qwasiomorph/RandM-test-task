import { Link, useParams } from "react-router-dom";

import {
  useGetCharacterListQuery,
  useGetCharacterQuery,
} from "../../services/character/character.api";
import { convertUrl, getId, prepareQuery } from "../../utils/utils";
import ItemList from "../../shared/ItemList/ItemList";
import { useGetEpisodesByIdQuery } from "../../services/episode/episode.api";
import { Params } from "../../types/router/routerTypes";
import Recommendations from "../../features/Recommendations/Recommendations";

import styles from "./Item.module.scss";

const Character = () => {
  const { id } = useParams<keyof Params>() as Params;
  const { data, isFetching } = useGetCharacterQuery(id!);
  const episodeIds = data?.episode.map(getId);
  const { data: episodes } = useGetEpisodesByIdQuery(episodeIds!, {
    skip: !episodeIds,
  });
  const { data: recommended } = useGetCharacterListQuery(
    prepareQuery("character", "", data?.status, data?.species, data?.gender),
  );

  return (
    <>
      {isFetching && <h2>Loading...</h2>}
      {data && !isFetching ? (
        <div className={styles.container}>
          <aside className={styles.imageAside}>
            <img src={data.image} alt={`${data.name}'s image`} />
          </aside>
          <div>
            <h3>
              {data.name} {data.species} {data.gender}{" "}
              <h4>Status: {data.status}</h4>
            </h3>
            <div>
              Origin:{" "}
              {data.origin.url ? (
                <Link to={convertUrl(data.origin.url)}>{data.origin.name}</Link>
              ) : (
                <div>{data.origin.name}</div>
              )}
            </div>
            <div>
              Last seen in:{" "}
              <Link to={convertUrl(data.location.url)}>
                {data.location.name}
              </Link>
            </div>
            <h4>Can be seen in episodes:</h4>
            <ItemList items={episodes || []} />
          </div>
          {recommended ? (
            <Recommendations
              label="See also: "
              items={
                recommended.results.filter(
                  (item) => Number(item.id) !== Number(id),
                ) || []
              }
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

export default Character;
