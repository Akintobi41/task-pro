/* eslint-disable react/prop-types */
import s from "./s_navbar.module.css";
import { Link } from "react-router-dom";
const Navbar = ({ toggle }) => {
  const navList = ["Home", "Create", "Deleted"];
  return (
    <nav className={`${s.nav} ${toggle ? s["dark-nav"] : ""}`}>
      <Link to={"/"} className={s["logo-section"]}>
        <img
          src="/Images/success.png"
          alt="completed successfully"
          className={s.logo}
        />
        <h3 className={` ${s.h3} ${toggle ? s["dark-items"] : ""}`}>TaskPro</h3>
      </Link>
      <section className={s["menu-section"]}>
        {" "}
        {navList.map((item) => {
          return item === "Home" ? (
            <Link
              to="/"
              key={item}
              className={`${s["nav-items"]} ${toggle ? s["dark-items"] : ""}`}
            >
              {item}
            </Link>
          ) : (
            <Link
              to={`/${item.slice(0)}`}
              key={item}
              className={`${s["nav-items"]} ${toggle ? s["dark-items"] : ""}`}
            >
              {item}
            </Link>
          );
        })}
      </section>
    </nav>
  );
};

export default Navbar;
