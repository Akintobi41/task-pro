import s from "./s_create.module.css";
import Form from "./Form";
const Create = () => {
  return (
    <section className={s["create-section"]}>
      <section className={s.title}>
        <small>Register your task to get started</small>
      </section>
      <Form method={"POST"} />
    </section>
  );
};

export default Create;
