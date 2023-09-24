import s from "./s_create.module.css";
import { formDetails } from "./form_details";
const FormDetails = ({
  form,
  disabled,
  handleChange,
  myref,
}) => {
  return (
    <form action="" className={s.form} ref={myref}>
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
              {label.text}:
              <textarea
                name={label.name}
                id={label.type}
                className={label.className}
                value={form.notes}
                onChange={(e) => handleChange(e)}
                required
                disabled={disabled}
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
                value={form[`${label.name}`]}
                onChange={(e) => handleChange(e)}
                autoComplete="on"
                required={
                  label.type !== "date" ? true : false
                }
                disabled={disabled}
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
        >
          {disabled ? "adding task..." : "add task"}
        </button>{" "}
      </section>
    </form>
  );
};

export default FormDetails;
