/* eslint-disable react/prop-types */
import s from "./s_loader.module.css";
const Loader = ({ loading, toggle }) => {
  return (
    <section className={`${loading ? s.hide : s.show}`}>
      {" "}
      <div className={s["lds-ellipsis"]}>
        <div className={`${toggle ? s.dark : ""}`}></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default Loader;
