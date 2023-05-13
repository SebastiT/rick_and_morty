import SearchBar from "../SearchBar/SearchBar";
import styles from "./Nav.module.css"
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Nav = ({ onSearch }) => {
  
  const location = useLocation()

  if (location.pathname === "/") {
    return null;
  }

  return (
    <div className={styles.nav}>
      <NavLink to="/about">
        <button>About</button>
      </NavLink>
      <NavLink to="/home">
        <button>Home</button>
      </NavLink>
      <NavLink to="/favorites">
        <button>Favorites</button>
      </NavLink>
      <SearchBar onSearch={onSearch} />
    </div>
  );
}

export default Nav;