import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { useLazyGetCharacterListQuery } from "../../services/character/character.api";
import { SyntheticEvent, useCallback, useEffect } from "react";
import ItemList from "../../shared/ItemList/ItemList";

import {
  setCharGenderFilter,
  setCharStatusFilter,
  setCharacterList,
  setNameFilter,
} from "../../features/Search/searchSlice";
import {
  selectCharQueryFilter,
  selectCharacterList,
  selectNameFilter,
  selectNextPageQuery,
} from "../../features/Search/selector";

import styles from "./ItemSearch.module.scss";

const CharSearch = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const charQuery = useSelector(selectCharQueryFilter); // gets char query from state
  const nextCharQuery = useSelector(selectNextPageQuery); // gets query for the next page from state

  const inputValue = useSelector(selectNameFilter);

  const stateChars = useSelector(selectCharacterList); // gets char list from the state (these are rendered)

  const handleNameInput = (e: SyntheticEvent) => {
    dispatch(setNameFilter((e.target as HTMLInputElement).value));
  };

  const [
    charTrigger,
    { data: characters, error: charError, isFetching: isFetchingChars },
  ] = useLazyGetCharacterListQuery(); // Fetches data from API

  const debouncedCharTrigger = useCallback(debounce(charTrigger, 750), []);

  const handleNewCharPage = () => {
    // fetches next page fetch. Triggered in <ItemList> using intersection observer
    if (nextCharQuery) {
      charTrigger(nextCharQuery);
    }
  };

  const handleCharFilterChange = (e: SyntheticEvent) => {
    // adds more search filters to the query (charQuery)
    const isStatusChange =
      (e.currentTarget as HTMLSelectElement).name === "status";
    const isGenderChange =
      (e.currentTarget as HTMLSelectElement).name === "gender";
    const target = e.target as HTMLOptionElement;
    if (isStatusChange) {
      dispatch(setCharStatusFilter(target.value));
    }
    if (isGenderChange) {
      dispatch(setCharGenderFilter(target.value));
    }
  };

  useEffect(() => {
    // triggers fetch function
    if (inputValue.length > 2) {
      debouncedCharTrigger(charQuery!);
    }
  }, [inputValue, charQuery]);

  useEffect(() => {
    // pushes fetched items to the state
    if (!charError && characters && !isFetchingChars) {
      dispatch(setCharacterList(characters));
    }
  }, [characters, charError]);

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

        <div>
          <h4>Status</h4>
          <label>
            <select onChange={handleCharFilterChange} name="status">
              <option value="">No filter</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>
        </div>

        <div>
          <h4>Gender</h4>
          <label>
            <select onChange={handleCharFilterChange} name="gender">
              <option value="">No filter</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>
        </div>
      </div>
      <div className={styles.listsWrapper}>
        <div>
          {(stateChars || charError) && inputValue ? (
            <>
              <h4>Characters</h4>
              {!stateChars ? (
                <h5>There is nothing here</h5>
              ) : (
                <ItemList items={stateChars} fetchNewPage={handleNewCharPage} />
              )}
            </>
          ) : (
            <></>
          )}
          {isFetchingChars && <h4>Loading...</h4>}
        </div>
      </div>
    </div>
  );
};

export default CharSearch;
