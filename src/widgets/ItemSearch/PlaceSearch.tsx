import debounce from "lodash.debounce";
import { SyntheticEvent, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import ItemList from "../../shared/ItemList/ItemList";
import { useLazyGetLocationListQuery } from "../../services/location/location.api";
import {
  setLocationDimensionFilter,
  setLocationList,
  setLocationTypeFilter,
  setNameFilter,
} from "../../features/Search/searchSlice";
import {
  selectDimensionFilter,
  selectLocationList,
  selectNameFilter,
  selectNextPlacePageQuery,
  selectPlaceQueryFilter,
  selectTypeFilter,
} from "../../features/Search/selector";

import styles from "./ItemSearch.module.scss";

const PlaceSearch = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const placeQuery = useSelector(selectPlaceQueryFilter);
  const nextPlaceQuery = useSelector(selectNextPlacePageQuery);

  const inputValue = useSelector(selectNameFilter);
  const typeValue = useSelector(selectTypeFilter);
  const dimensionValue = useSelector(selectDimensionFilter);

  const statePlaces = useSelector(selectLocationList);

  const handleNameInput = (e: SyntheticEvent) => {
    dispatch(setNameFilter((e.target as HTMLInputElement).value));
  };

  const [
    trigger,
    { data: places, error: placeError, isFetching: isFetchingPlaces },
  ] = useLazyGetLocationListQuery();

  const debouncedPlaceTrigger = useCallback(debounce(trigger, 750), []);

  const handleNewPlacePage = () => {
    if (nextPlaceQuery) {
      trigger(nextPlaceQuery);
    }
  };

  const handlePlaceFilterChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const isTypeChange = target.name === "type";
    const isDimesnionChange = target.name === "dimension";
    if (isTypeChange) {
      dispatch(setLocationTypeFilter(target.value));
    }
    if (isDimesnionChange) {
      dispatch(setLocationDimensionFilter(target.value));
    }
  };

  useEffect(() => {
    if (inputValue.length > 2) {
      debouncedPlaceTrigger(placeQuery!);
    }
  }, [inputValue, placeQuery]);

  useEffect(() => {
    if (!placeError && places && !isFetchingPlaces) {
      dispatch(setLocationList(places));
    }
  }, [places, placeError]);

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
        <label className={styles.searchInput}>
          <input
            onChange={handlePlaceFilterChange}
            value={dimensionValue}
            type="text"
            name="dimension"
            placeholder={`Enter location dimension`}
          />
        </label>

        <label className={styles.searchInput}>
          <input
            onChange={handlePlaceFilterChange}
            value={typeValue}
            type="text"
            name="type"
            placeholder={`Enter location type`}
          />
        </label>
      </div>
      <div className={styles.listsWrapper}>
        <div>
          {(statePlaces || placeError) && inputValue ? (
            <>
              <h4>Places</h4>
              {!statePlaces ? (
                <h5>There is nothing here</h5>
              ) : (
                <ItemList
                  items={statePlaces}
                  fetchNewPage={handleNewPlacePage}
                />
              )}
            </>
          ) : (
            <></>
          )}
          {isFetchingPlaces && <h4>Loading...</h4>}
        </div>
      </div>
    </div>
  );
};

export default PlaceSearch;
