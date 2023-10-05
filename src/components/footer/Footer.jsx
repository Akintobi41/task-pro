import s from "./s_footer.module.css";
const Footer = ({ data, handleNext, handlePrevious, endIndex, toggle }) => {
  return (
    <footer className={s.footer}>
      <button className={s.button}>{endIndex}</button>
      <p
        className={`${s["footer-text"]} ${toggle ? s["footer-text-dark"] : ""}`}
      >
        Of
      </p>
      <button className={s.button}>{data?.length}</button>
      <button className={s.button} onClick={handlePrevious}>
        {"<"}
      </button>
      <button className={s.button} onClick={handleNext}>
        {">"}
      </button>
    </footer>
  );
};

export default Footer;
