/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import s from "./s_TaskDetails.module.css";
import { formDetails } from "../create/form_details";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/preloader/Loader";
import { options } from "../../utils/options";
import { BASE_URL } from "../../utils/endpoints";
import ConfirmDelete from "../../components/confirmDelete/ConfirmDelete";
import { allTasks } from "../../utils/endpoints";
import { getClass, shortenTask } from "./u_TaskDetails";
import RenderFormInput from "./RenderFormInput";
import useDataApiHandler from "../../utils/useApiDataHandler";

const TaskDetails = ({
  toggle,
  recentlyDeleted,
  setRecentlyDeleted,
  errorMsg,
  setErrorMsg,
}) => {
  const el = useRef();
  const [tracker, setTracker] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: "",
    completed: "",
    due_date: "",
    liked: "",
    notes: "",
  });
  const ref = useRef();
  const [disabled, setDisabled] = useState();
  const [loading, setLoading] = useState(false);
  const [dialogue, setDialogue] = useState(false);
  const [btn, setBtn] = useState("");
  const [error, setError] = useState("");
  const { updateData } = useDataApiHandler(form);
  const currentTaskUrl = `${BASE_URL}${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}${id}`, options);

        if (!response.ok) {
          throw new Error(
            "Task not available at the moment. Please try again later.",
          );
        }

        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    //update form data on component mount
    const handleSubmit = (e) => {
      setErrorMsg(false);
      e.preventDefault();
      //Update form details
      setDisabled(true);
      const formData = new FormData(e.target);
      const formJson = Object.fromEntries(formData.entries());
      // Merge properties from Form Json into the form object
      setForm({ ...form, ...formJson });
      setTracker(true);
    };

    // Event Listener can only be added when component has been mounted
    if (loading) {
      const element = ref.current;
      element.addEventListener("submit", handleSubmit);

      return () => {
        element.removeEventListener("submit", handleSubmit);
        console.log("clean up");
      };
    }
  }, [form, loading]);

  useEffect(() => {
    // Update Task
    if (tracker) {
      updateData("PUT", currentTaskUrl);
    }
    setTracker(false);
  }, [tracker]);

  //Delete Task
  const handleDelete = () => {
    setDialogue(true);
  };

  function cancel() {
    setDialogue(false);
  }
  function confirmDelete() {
    setDialogue(false);
    setDeleted(true);
    updateData("DELETE", currentTaskUrl);
    setRecentlyDeleted([...recentlyDeleted, data]);
  }

  return (
    <>
      <section
        className={`${s["task-details"]} ${
          toggle ? s["task-details-dark"] : ""
        }`}
      >
        <header>
          <h4>Task Progress Hub</h4>
          {loading && <p className={s["task-gid"]}>{shortenTask(id)}</p>}
        </header>
        {!loading && <Loader loading={loading} />}

        {loading && (
          <section className={s["form-container"]}>
            {dialogue && (
              <ConfirmDelete
                btn={btn}
                setBtn={setBtn}
                toggle={toggle}
                cancel={cancel}
                confirmDelete={confirmDelete}
              />
            )}
            <form
              action=""
              ref={ref}
              className={`${s.form} ${dialogue ? s.blur : ""}`}
            >
              {formDetails.map((label) => (
                <label className={getClass(label)} key={label.text}>
                  <RenderFormInput
                    data={data}
                    disabled={disabled}
                    label={label}
                  />
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
    </>
  );
};

export default TaskDetails;
