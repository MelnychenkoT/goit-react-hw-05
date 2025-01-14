import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from 'clsx';
import { GiFilmProjector } from "react-icons/gi";

const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  }; 

  const Navigation = () => {
  return (
    <header className={s.navigation}>
    <p className={s.logo}>
    <GiFilmProjector />
      FilmStudio
    </p>

    <nav className={s.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
  </header>
  )
}

export default Navigation

