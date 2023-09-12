import s from "./s_navbar.module.css";
const Navbar = () => {
  const navList = ["Home", "Create"];
  return (
    <nav className={s.nav}>
      <section className={s["logo-section"]}>
        <img
          src="/Images/success.png"
          alt="completed successfully"
          className={s.logo}
        />
        <h2>TaskPlc</h2>
      </section>
      <section className={s["menu-section"]}>
        {" "}
        {navList.map((item) => {
          return <p key={item}>{item}</p>;
        })}
      </section>
    </nav>
  );
};

export default Navbar;
