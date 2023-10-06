/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useParams, useNavigate } from "react-router-dom";
import s from "./s_taskdetails.module.css";
import { formDetails } from "../create/form_details";
import { useEffect, useRef, useState } from "react";
import { deleteOptions, postToApi } from "/src/utils/usePostToApi.js";
import Loader from "../../components/preloader/Loader";
import { options } from "../../utils/options";

const TaskDetails = ({
  home_url,
  toggle,
  recentlyDeleted,
  setRecentlyDeleted,
}) => {
  const Navigate = useNavigate();
  const el = useRef();
  const [tracker, setTracker] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState([]);
  // const { data, loading } = useFetch(`${home_url}${id}`, "GET");
  const [form, setForm] = useState({
    name: "",
    completed: "",
    due_date: "",
    liked: "",
    notes: "",
    start_date: "",
  });
  const ref = useRef();
  const [disabled, setDisabled] = useState();
  const [loading, isLoading] = useState(false);
  useEffect(() => {
    console.log(loading);
    const handleSubmit = (e) => {
      //Update form details
      setDisabled(true);
      e.preventDefault();
      const formData = new FormData(e.target);
      const formJson = Object.fromEntries(formData.entries());
      // Merge properties from Form Json into the form object
      setForm({ ...form, ...formJson });
      setTracker(true);
      console.log(formJson);
    };
    console.log(form);

    if (loading) {
      const element = ref.current;
      element.addEventListener("submit", handleSubmit);
      return () => element.removeEventListener("submit", handleSubmit);
    }
  }, [el, form, loading]);

  useEffect(() => {
    // Update Task
    if (tracker) {
      fetch(`${home_url}${id}`, postToApi("PUT", form)).then((res) => {
        if (!res.ok)
          throw Error(
            "unable to update task at the moment, please try again later",
          );
        Navigate("/");
      });
    }
    setTracker(false);
  }, [form, home_url, id, tracker, Navigate]);
  useEffect(() => {
    fetch(`${home_url}${id}`, options)
      .then((res) => {
        // Check if the response is OK; otherwise, throw an error
        if (!res.ok)
          throw Error(
            "No tasks available at the moment. Please try again later...",
          );
        return res.json();
      })
      .then((res) => {
        isLoading(true);
        setData(res.data);
        // setError(false);
      })
      .catch((error) => {
        isLoading(true);
        console.error(error.message);
      });
  }, []);

  //Delete Task
  const handleDelete = () => {
    setDeleted(true);
    fetch(`${home_url}${id}`, deleteOptions).then((res) => {
      if (!res.ok)
        throw Error(
          "unable to delete task at the moment, please try again later",
        );
      setRecentlyDeleted([data]);
      Navigate("/");
    });
  };
  console.log(data);

  return (
    <section
      className={`${s["task-details"]} ${toggle ? s["task-details-dark"] : ""}`}
    >
      <header>
        <h4>Task Progress Hub</h4>
        {loading && (
          <p className={s["task-gid"]}>
            Task {id.slice(0, 4)}...
            {id.slice(id.length - 5, id.length)}
          </p>
        )}
      </header>
      {!loading && <Loader loading={loading} />}

      {loading && (
        <section className={s["form-container"]}>
          <form action="" ref={ref} className={s.form}>
            {formDetails.map((label) => (
              <label
                className={`${
                  label.type === "radio"
                    ? s["task-name-label-radio"]
                    : s["task-name-label"]
                } ${label.name === "completed" ? s.completed : ""}`}
                key={label.text}
              >
                {" "}
                {label.type === "radio" ? (
                  <>
                    <p
                      className={`${
                        label.type === "radio"
                          ? s["label-text-radio"]
                          : s["label-text"]
                      }`}
                    >
                      {label.text}
                    </p>
                    <section className={s["radio-inputs"]}>
                      <label className={s["radio-label"]} name={label.name}>
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
                    <p className={s["label-text"]}>{label.text}:</p>
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
                    <p className={s["label-text"]}> {label.text}:</p>
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
                      required={label.type !== "date" ? true : false}
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
                } ${loading ? "hide-btn" : ""}`}
                disabled={disabled}
                value="update"
              >
                {disabled ? "Updating Task..." : "Update Task"}
              </button>{" "}
            </section>
          </form>
          <button value="delete" className={s.delete} onClick={handleDelete}>
            {deleted ? "Deleting Task..." : "Delete Task"}
          </button>
        </section>
      )}
    </section>
  );
};

export default TaskDetails;
