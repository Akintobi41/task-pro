/* eslint-disable react/prop-types */
import s from "./s_RefreshButton.module.css";
function RefreshButton({ toggle, fetchData }) {
  return (
    <button
      onClick={fetchData}
      className={`${s["refresh-button"]} ${toggle ? s["dark"] : ""}`}
    >
      Refresh
      {toggle ? (
        <img
          src="/public/Images/icons8-refresh -light.svg"
          alt="refresh-button"
          className={s.refresh}
        />
      ) : (
        <img
          src="/public/Images/icons8-refresh.svg"
          alt="refresh-button"
          className={s.refresh}
        />
      )}
    </button>
  );
}

export default RefreshButton;
