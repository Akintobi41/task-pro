/* eslint-disable react/prop-types */
import s from "./s_ConfirmDelete.module.css";
const ConfirmDelete = ({ setBtn, toggle, cancel, confirmDelete }) => {
  const val1 = "Nevermind",
    val2 = "Delete";
  const checkBtn = (e) => {
    const val = e.target.value;
    if (val === val1) {
      setBtn(val);
      cancel();
    }
    if (val === val2) {
      setBtn(val2);
      confirmDelete();
    }
  };
  return (
    <section className={s.dialogue}>
      <section className={`${s["dialogue-header"]} ${toggle ? s.dark : ""}`}>
        <h5>Are you sure</h5>
        <button className={s["close-button"]}>x</button>
      </section>
      <section className={s["dialogue-content"]}>
        <p className={`${s["dialogue-text"]} ${toggle ? s.dark : ""}`}>
          Are you sure you want to delete this task? All your changes may be
          lost
        </p>
        <section className={s["button-section"]} onClick={(e) => checkBtn(e)}>
          <button
            className={`${s["dialogue-btn"]} ${s["btn-1"]}`}
            value={"Nevermind"}
          >
            Nevermind
          </button>
          <button
            className={`${s["dialogue-btn"]} ${s["btn-2"]}`}
            value={"Delete"}
          >
            Delete
          </button>
        </section>
      </section>
    </section>
  );
};

export default ConfirmDelete;
