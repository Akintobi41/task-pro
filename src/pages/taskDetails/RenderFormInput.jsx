/* eslint-disable react/prop-types */
import s from "./s_TaskDetails.module.css";
const RenderFormInput = ({ label, data, disabled }) => {
  return label.type === "radio" ? (
    <>
      <p
        className={`${
          label.type === "radio" ? s["label-text-radio"] : s["label-text"]
        }`}
      >
        {label.text}
      </p>
      <section className={s["radio-inputs"]}>
        {[true, false].map((option, i) => (
          <label className={s["radio-label"]} key={option}>
            {label.select[i]}
            <input
              type={label.type}
              className={label.className}
              name={label.name}
              defaultChecked={data.completed === option}
              value={option}
              required
              disabled={disabled}
            />
          </label>
        ))}
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
        disabled={disabled}
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
        required={label.type !== "date"}
        disabled={disabled}
      />
    </>
  );
};

export default RenderFormInput;
