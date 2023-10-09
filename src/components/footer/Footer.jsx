/* eslint-disable react/prop-types */
import s from "./s_footer.module.css";
const Footer = ({
  data,
  handleNext,
  handlePrevious,
  endIndex,
  toggle,
  exactPage,
  totalPages,
}) => {
  return (
    <footer className={s.footer}>
      <button className={s.button} disabled>
        {endIndex}
      </button>
      <p
        className={`${s["footer-text"]} ${toggle ? s["footer-text-dark"] : ""}`}
      >
        Of
      </p>
      <button className={s.button} disabled>
        {data?.length}
      </button>
      <button
        className={`${s.button} ${exactPage === 1 ? s["not-allowed"] : ""}`}
        onClick={handlePrevious}
        disabled={exactPage === 1}
      >
        {"<"}
      </button>
      <button
        className={`${s.button} ${
          exactPage === totalPages ? s["not-allowed"] : ""
        }`}
        onClick={handleNext}
        disabled={exactPage === totalPages}
      >
        {">"}
      </button>
    </footer>
  );
};

export default Footer;
