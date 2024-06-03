import { FC } from "react";
import { Link } from "react-router-dom";
import { CV, convertUrl } from "../../utils/utils";

import styles from "./ItemList.module.scss";

interface ItemListElementProps {
  item: {
    name: string;
    url: string;
    image?: string;
    status?: "Alive" | "Dead" | "unknown";
    gender?: "Female" | "Male" | "Genderless" | "unknown";
    species?: string;
  };
}

const ItemListElement: FC<ItemListElementProps> = ({ item }) => {
  return (
    <li
      className={CV(
        styles.list__item,
        item.image ? styles["list__item--hasImage"] : "",
      )}
    >
      {item.image ? (
        <div className={styles.imgWrap}>
          <img src={item.image} alt={`${item.name}'s image`} />
        </div>
      ) : (
        <></>
      )}
      <div className={styles.flexWrapper}>
        <div className={styles.nameWrap}>
          <label className={styles.label}>{"Name:"} </label>
          <Link id={item.url} to={convertUrl(item.url)}>
            {item.name}
          </Link>
        </div>
        {item.status && item.gender && item.species ? (
          <div className={styles.expandedInfo}>
            <span className={CV(styles.status, styles[item.status])}></span>
            {`${item.status} - ${item.species} ${item.gender}`}
          </div>
        ) : (
          <></>
        )}
      </div>
    </li>
  );
};

export default ItemListElement;
