/* eslint-disable react/prop-types */
import s from "./s_DarkMode.module.css";
const DarkMode = ({ toggle, setToggle }) => {
  return (
    <section className={s["dark-mode"]}>
      <div
        className={`${s.label} ${toggle ? s.switch : " "}`}
        onClick={() => setToggle(!toggle)}
      >
        <div
          className={`${s.toggler} ${toggle ? s["toggler-dark"] : " "}`}
        ></div>{" "}
      </div>
    </section>
  );
};

export default DarkMode;
