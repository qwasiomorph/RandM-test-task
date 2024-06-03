import debounce from "lodash.debounce";
import { SyntheticEvent, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import ItemList from "../../shared/ItemList/ItemList";
import { useLazyGetFilteredEpisodeListQuery } from "../../services/episode/episode.api";
import {
  setEpisodeList,
  setNameFilter,
} from "../../features/Search/searchSlice";
import {
  selectEpisodeList,
  selectEpisodeQueryFilter,
  selectNameFilter,
  selectNextEpisodePageQuery,
} from "../../features/Search/selector";

import styles from "./ItemSearch.module.scss";

const EpisodeSearch = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const episodeQuery = useSelector(selectEpisodeQueryFilter);
  const nextEpisodeQuery = useSelector(selectNextEpisodePageQuery);

  const inputValue = useSelector(selectNameFilter);

  const stateEpisodes = useSelector(selectEpisodeList);

  const handleNameInput = (e: SyntheticEvent) => {
    dispatch(setNameFilter((e.target as HTMLInputElement).value));
  };

  const [
    trigger,
    { data: episodes, error: episodeError, isFetching: isFetchingEpisodes },
  ] = useLazyGetFilteredEpisodeListQuery();

  const debouncedEpisodeTrigger = useCallback(debounce(trigger, 750), []);

  const handleNewEpisodePage = () => {
    if (nextEpisodeQuery) {
      trigger(nextEpisodeQuery);
    }
  };

  useEffect(() => {
    if (inputValue.length > 2) {
      debouncedEpisodeTrigger(episodeQuery!);
    }
  }, [inputValue, episodeQuery]);

  useEffect(() => {
    if (!episodeError && episodes && !isFetchingEpisodes) {
      dispatch(setEpisodeList(episodes));
    }
  }, [episodes, episodeError]);

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <label className={styles.searchInput}>
          <input
            onChange={handleNameInput}
            value={inputValue}
            type="text"
            placeholder={`Enter ${pathname.slice(1)} name`}
          />
        </label>
      </div>
      <div className={styles.listsWrapper}>
        <div>
          {(stateEpisodes || episodeError) && inputValue ? (
            <>
              <h4>Characters</h4>
              {!stateEpisodes ? (
                <h5>There is nothing here</h5>
              ) : (
                <ItemList
                  items={stateEpisodes}
                  fetchNewPage={handleNewEpisodePage}
                />
              )}
            </>
          ) : (
            <></>
          )}
          {isFetchingEpisodes && <h4>Loading...</h4>}
        </div>
      </div>
    </div>
  );
};

export default EpisodeSearch;
