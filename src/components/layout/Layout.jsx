import s from "./s_layout.module.css";
import Navbar from "../navbar/Navbar";
const Layout = ({ children }) => {
  return (
    <main className={s.layout}>
      <section className={s.wrapper}>
        <header className={s.header}>
          <Navbar />
        </header>
      </section>
      {children}
    </main>
  );
};

export default Layout;
