/* eslint-disable react/prop-types */
import s from "../../pages/home/s_home.module.css";
const ErrorDisplay = ({ toggle, error }) => {
  return (
    <>
      {error && (
        <p className={`${s["error"]} ${toggle ? s["error-dark"] : ""}`}>
          Failed to fetch data...
        </p>
      )}
    </>
  );
};

export default ErrorDisplay;
