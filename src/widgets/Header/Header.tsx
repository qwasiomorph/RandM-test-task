import styles from "./Header.module.scss";

import logo from "../../assets/icons/logo.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../../utils/consts";
import { useDispatch } from "react-redux";
import { clearAll } from "../../features/Search/searchSlice";
import Theme from "../../features/Theme/Theme";

const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleChangeNav = () => {
    dispatch(clearAll());
  };

  return (
    <header className={styles.container}>
      <div className={styles.imgContainer}>
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
        <Theme />
      </div>
      <nav>
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li
              key={link.name}
              className={pathname.includes(link.url) ? styles.active : ""}
            >
              <NavLink onClick={handleChangeNav} to={link.url}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
