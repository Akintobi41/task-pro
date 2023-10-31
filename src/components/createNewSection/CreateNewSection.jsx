/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import s from "../../pages/home/s_home.module.css";

const CreateNewSection = ({ toggle, status }) => {
  return (
    <>
      {status && (
        <section className={s["create-new"]}>
          <p
            className={`${s["create-new-text"]} ${
              toggle ? s["create-text-dark"] : ""
            }`}
          >
            No tasks created yet, ready to personalize?
          </p>
          <Link
            to="/create"
            className={`${s["create-new-link"]} ${
              toggle ? s["create-text-dark"] : ""
            }`}
          >
            Let{`'`}s get started
          </Link>
        </section>
      )}
    </>
  );
};

export default CreateNewSection;
