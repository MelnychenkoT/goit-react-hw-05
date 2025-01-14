import { NavLink } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div>
      <div className={s.text}>Page is not found...</div>
      <NavLink to="/" className={s.navLink}>
        Home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;