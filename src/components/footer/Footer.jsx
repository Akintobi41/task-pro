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
  const btns = [
    { id: 1, class: s.button, item: endIndex },
    {
      id: 2,
      class: `${s["footer-text"]} ${toggle ? s["footer-text-dark"] : ""}`,
      item: "Of",
    },
    { id: 3, class: s.button, item: data?.length },
    {
      id: 4,
      class: `${s.button} ${exactPage === 1 ? s["not-allowed"] : ""}`,
      item: "<",
    },
    {
      id: 5,
      class: `${s.button} ${exactPage === totalPages ? s["not-allowed"] : ""}`,
      item: ">",
    },
  ];
  return (
    <footer className={s.footer}>
      {btns.map((btn) =>
        btn.id === 2 ? (
          <p className={btn.class} key={btn.id}>
            {btn.item}
          </p>
        ) : (
          <button
            key={btn.id}
            className={`${btn.class} ${toggle ? s.dark : ""}`}
            disabled={
              btn.id === 1
                ? true
                : btn.id === 3
                ? true
                : btn.id === 4 && exactPage === 1
                ? true
                : btn.id === 5 && exactPage === totalPages
            }
            onClick={
              btn.id === 4
                ? handlePrevious
                : btn.id === 5
                ? handleNext
                : undefined
            }
          >
            {btn.item}
          </button>
        ),
      )}
    </footer>
  );
};

export default Footer;
