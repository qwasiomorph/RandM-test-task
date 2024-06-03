import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { set } from "./slice";
import { RootState } from "../../app/store/store";

import styles from "./Theme.module.scss";

const Theme = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleChange = () => {
    const next = theme === "dark" ? "light" : "dark";
    dispatch(set(next));
  };

  return (
    <div className={styles.themeContainer}>
      <input
        checked={theme === "dark"}
        type="checkbox"
        onChange={handleChange}
        id="toggle"
        className={styles.toggleCheckbox}
      />
      <label htmlFor="toggle" className={styles.toggleContainer}>
        <div>Light</div>
        <div>Dark</div>
      </label>
    </div>
  );
};

export default Theme;
