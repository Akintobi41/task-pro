import s from "./s_layout.module.css";
import Navbar from "../navbar/Navbar";
const Layout = ({ children, toggle, setToggle }) => {
  return (
    <main className={`${s.layout} ${toggle ? s["dark-layout"] : ""}`}>
      <section className={s.wrapper}>
        <header className={s.header}>
          <Navbar toggle={toggle} />
        </header>
      </section>
      {children}
    </main>
  );
};

export default Layout;
