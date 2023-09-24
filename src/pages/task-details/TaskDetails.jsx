import { useParams } from "react-router-dom";
import useFetch from "../../useFetch";
import s from "./s_taskdetails.module.css";
import { formDetails } from "../create/form_details";
// import { useEffect, useState } from "react";
import { useEffect, useRef, useState } from "react";
import { postToApi } from "../../usePostToApi";

const TaskDetails = ({ home_url }) => {
  //   const [d, setData] = useState([]);
  const el = useRef();
  const { id } = useParams(),
    { data, loading, error, status } = useFetch(
      `${home_url}${id}`,
      "GET"
    ),
    { name, completed, due_on, liked, notes, start_on } =
      data,
    [form, setForm] = useState({
      name: "",
      completed: "",
      due_date: "",
      liked: "",
      notes: "",
      start_date: "",
    }),
    ref = useRef(),
    [disabled, setDisabled] = useState();
  //   const update = { ...form };
  //   console.log(update);

  //   for (const k in update) {
  //     console.log(k);
  //   }

  //   const nameRef = useRef();
  //   const notesRef = useRef();
  //   const nameRef = useRef()
  //   const nameRef = useRef()
  //   const nameRef = useRef()
  // { form, setForm, handleChange } = useForm();
  console.log(`${home_url}${id}`);
  useEffect(() => {
    const handleSubmit = (e) => {
      setDisabled(true);
      e.preventDefault();
      console.log(e.target);
      setTimeout(() => {
        fetch(
          `${home_url}${id}`,
          postToApi("PUT", form)
        ).then((res) => {
          console.log(res);
        });
      }, 1000);

      //   console.log(form);
      const formData = new FormData(e.target);
      const formJson = Object.fromEntries(
        formData.entries()
      );
      // Merge properties from Form Json into the form object
      setForm({
        ...form,
        ...formJson,
      });
    };
    console.log(form);

    const element = ref.current;
    element.addEventListener("submit", handleSubmit);
    return () =>
      element.removeEventListener("submit", handleSubmit);
  }, [el, form]);

  return (
    <section className={s["task-details"]}>
      <header>
        <h4>Task Progress Hub</h4>
        <p>
          Task {id.slice(0, 4)}...
          {id.slice(id.length - 5, id.length)}
        </p>
      </header>
      <section>
        <form action="" ref={ref}>
          {formDetails.map((label) => (
            <label
              className={s["task-name-label"]}
              key={label.text}
            >
              {" "}
              {label.type === "radio" ? (
                <>
                  {label.text}
                  {`:`}
                  <section>
                    <label
                      className={s["radio-label"]}
                      name={label.name}
                    >
                      {" "}
                      {label.select[0]}
                      <input
                        type={label.type}
                        className={label.className}
                        name={label.name}
                        defaultChecked={data.completed}
                        value={true}
                        required
                      />
                    </label>{" "}
                    <label className={s["radio-label"]}>
                      {" "}
                      {label.select[1]}
                      <input
                        type={label.type}
                        className={label.className}
                        name={label.name}
                        defaultChecked={!data.completed}
                        value={false}
                        required
                      />
                    </label>
                  </section>
                </>
              ) : label.type === "text-area" ? (
                <>
                  {" "}
                  {label.text}:
                  <textarea
                    name={label.name}
                    id={label.type}
                    className={label.className}
                    defaultValue={data.notes}
                    required
                  ></textarea>
                </>
              ) : (
                <>
                  {label.text}:{" "}
                  <input
                    type={label.type}
                    name={label.name}
                    className={label.className}
                    placeholder={label.placeholder}
                    id={label.type}
                    defaultValue={
                      label.name === "name"
                        ? data.name
                        : label.name === "due_date"
                        ? data["due_on"]
                        : data["start_on"]
                    }
                    autoComplete="on"
                    required={
                      label.type !== "date" ? true : false
                    }
                  />
                </>
              )}
            </label>
          ))}
          <section className={s["button-section"]}>
            {" "}
            <button
              className={`${s["submit-button"]} ${
                disabled ? s.disabled : ""
              }`}
              disabled={disabled}
              value="update"
            >
              {disabled
                ? "updating task..."
                : "update task"}
            </button>{" "}
          </section>
        </form>
        <button value="delete">
          {disabled ? "deleting task..." : "delete task"}
        </button>
      </section>
    </section>
  );
};

export default TaskDetails;
