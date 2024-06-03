import { FC, useEffect } from "react";

import { ICharacter } from "../../types/character/characterDTO";
import { IEpisode } from "../../types/episode/episodeDTO";
import { ILocation } from "../../types/location/locationDTO";
import ItemListElement from "./ItemListElement";

import styles from "./ItemList.module.scss";
import { useInView } from "react-intersection-observer";

interface ItemListProps {
  items: ICharacter[] | IEpisode[] | ILocation[];
  fetchNewPage?: Function;
}

const ItemList: FC<ItemListProps> = ({ items, fetchNewPage }) => {
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView && fetchNewPage) {
      fetchNewPage();
    }
  }, [inView]);
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <ItemListElement key={item.id} item={item} />
      ))}
      <span ref={ref}></span>
    </ul>
  );
};

export default ItemList;
