import s from "./s_create.module.css";
import Form from "./Form";
const Create = ({ toggle }) => {
  return (
    <section
      className={`${s["create-section"]} ${
        toggle ? s["create-section-dark"] : ""
      }`}
    >
      <section className={s.title}>
        <small>Register your task to get started</small>
      </section>
      <Form method={"POST"} toggle={toggle} />
    </section>
  );
};

export default Create;
