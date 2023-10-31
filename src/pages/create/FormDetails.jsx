/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import s from "./s_create.module.css";
import { formDetails } from "./form_details";
import { useEffect } from "react";
const FormDetails = ({
  form,
  disabled,
  handleChange,
  myref,
  toggle,
  errorValues,
  setDisabled,
  setErrorValues,
}) => {
  useEffect(() => {
    if (!errorValues?.response) {
      const timer = setTimeout(() => {
        setErrorValues({ ...errorValues, response: true });
        setDisabled(false);
      }, 2000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [errorValues]);

  return (
    <>
      {!errorValues?.response ? (
        <p className={s["error-message"]}>
          An error occurred. Please try again.
        </p>
      ) : null}
      <form className={s.form} ref={myref}>
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
                      value={true}
                      onChange={(e) => handleChange(e)}
                      required
                      disabled={disabled}
                    />
                  </label>{" "}
                  <label className={s["radio-label"]}>
                    {" "}
                    {label.select[1]}
                    <input
                      type={label.type}
                      className={label.className}
                      name={label.name}
                      value={false}
                      onChange={(e) => handleChange(e)}
                      required
                      disabled={disabled}
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
                  value={form.notes}
                  onChange={(e) => handleChange(e)}
                  required
                  disabled={disabled}
                />
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
                  value={form[`${label.name}`]}
                  onChange={(e) => handleChange(e)}
                  autoComplete="on"
                  required
                  disabled={disabled}
                />
              </>
            )}
          </label>
        ))}
        <section className={s["button-section"]}>
          {" "}
          <button
            className={`${s["submit-button"]} ${disabled ? s.disabled : ""} ${
              toggle ? s["btn-dark"] : ""
            }`}
            disabled={disabled}
          >
            {disabled ? "Adding Task..." : "Add Task"}
          </button>{" "}
        </section>
      </form>
    </>
  );
};

export default FormDetails;
