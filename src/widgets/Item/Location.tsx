import { useParams } from "react-router-dom";

import {
  useGetLocationListQuery,
  useGetLocationQuery,
} from "../../services/location/location.api";
import { Params } from "../../types/router/routerTypes";
import { CV, getId, prepareQuery } from "../../utils/utils";
import { useGetCharactersByIdQuery } from "../../services/character/character.api";
import ItemList from "../../shared/ItemList/ItemList";
import Recommendations from "../../features/Recommendations/Recommendations";

import styles from "./Item.module.scss";

const Location = () => {
  const { id } = useParams<keyof Params>() as Params;
  const { data, isFetching } = useGetLocationQuery(id!);
  const residentIds = data?.residents.map(getId);
  const { data: residents } = useGetCharactersByIdQuery(residentIds!, {
    skip: !residentIds,
  });
  const { data: recommended } = useGetLocationListQuery(
    prepareQuery("location", "", "", data?.dimension),
  );

  const filteredRecommended =
    recommended?.results.filter((item) => Number(item.id) !== Number(id)) || [];

  return (
    <>
      {isFetching && <h2>Loading...</h2>}
      {data && !isFetching ? (
        <div className={CV(styles.container, styles["container--wo-image"])}>
          <div>
            <h1>{data.name}</h1>
            <h3>
              {data.type}, {data.dimension}
            </h3>
          </div>
          <div>
            <h4>Residents: </h4>
            {residents ? (
              <ItemList items={residents} />
            ) : (
              <h4>No residents here, apparantly.</h4>
            )}
          </div>
          {filteredRecommended.length > 0 ? (
            <Recommendations
              label="Places in the same dimension"
              items={filteredRecommended}
            />
          ) : (
            <div>
              <h4>Places in the same dimension</h4>
              <h4>Nothing else in this dimension</h4>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Location;
