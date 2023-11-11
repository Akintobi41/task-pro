/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import s from "./s_create.module.css";
import { formDetails } from "./form_details";
const FormDetails = ({
  form,
  handleChange,
  myref,
  toggle,
  errorValues,
  disabled,
}) => {
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
                      disabled={errorValues?.disabled}
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
                      disabled={errorValues?.disabled}
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
                  disabled={errorValues?.disabled}
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
                  disabled={errorValues?.disabled}
                />
              </>
            )}
          </label>
        ))}
        <section className={s["button-section"]}>
          {" "}
          <button
            className={`${s["submit-button"]} ${
              disabled === null || disabled === undefined ? s.disabled : ""
            } ${toggle ? s["btn-dark"] : ""}`}
            disabled={errorValues?.disabled}
          >
            {errorValues?.disabled ? "Adding Task..." : "Add Task"}
          </button>{" "}
        </section>
      </form>
    </>
  );
};

export default FormDetails;
