import s from "./s_navbar.module.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const navList = ["Home", "Create", "Notes"];
  return (
    <nav className={s.nav}>
      <section className={s["logo-section"]}>
        <img
          src="/Images/success.png"
          alt="completed successfully"
          className={s.logo}
        />
        <h3>TaskPlc</h3>
      </section>
      <section className={s["menu-section"]}>
        {" "}
        {navList.map((item) => {
          return (
            <Link
              to={`/${item === "Home" ? "" : item}`}
              key={item}
              className={s["nav-items"]}
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
