import s from "./s_RefreshButton.module.css";
function RefreshButton({ onClick, toggle }) {
  return (
    <button
      onClick={onClick}
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
