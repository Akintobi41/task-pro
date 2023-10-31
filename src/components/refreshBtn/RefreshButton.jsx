/* eslint-disable react/prop-types */
import s from "./s_RefreshButton.module.css";
function RefreshButton({ toggle, fetchData, status }) {
  return (
    <>
      {!status && (
        <button
          onClick={fetchData}
          className={`${s["refresh-button"]} ${toggle ? s["dark"] : ""}`}
        >
          Refresh
          {toggle ? (
            <img
              src="/Images/icons8-refresh -light.svg"
              alt="refresh-button"
              className={s.refresh}
              loading="lazy"
            />
          ) : (
            <img
              src="/Images/icons8-refresh.svg"
              alt="refresh-button"
              className={s.refresh}
              loading="lazy"
            />
          )}
        </button>
      )}
    </>
  );
}

export default RefreshButton;
