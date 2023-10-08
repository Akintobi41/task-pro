/* eslint-disable react/prop-types */
import s from "./s_create.module.css";
import Form from "./Form";
const Create = ({ toggle, home_url, errorMsg, setErrorMsg }) => {
  return (
    <section
      className={`${s["create-section"]} ${
        toggle ? s["create-section-dark"] : ""
      }`}
    >
      <section className={s.title}>
        <small>Register your task to get started</small>
      </section>
      <Form
        method={"POST"}
        toggle={toggle}
        home_url={home_url}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
      />
    </section>
  );
};

export default Create;
