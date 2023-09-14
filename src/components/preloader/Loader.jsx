import s from "./s_loader.module.css";
const Loader = ({ loading }) => {
  return (
    <section className={`${loading ? s.show : s.hide}`}>
      {" "}
      <div className={s["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default Loader;
