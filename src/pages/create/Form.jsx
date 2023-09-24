import { useState, useRef, useEffect } from "react";
// import s from "./s_create.module.css";
// import { formDetails } from "./form_details";
import { postToApi } from "../../usePostToApi";
import { useNavigate } from "react-router-dom";
import FormDetails from "./FormDetails";
import useForm from "../../useForm";
const Form = () => {
  const url = "https://app.asana.com/api/1.0/tasks",
    Navigate = useNavigate(),
    [disabled, setDisabled] = useState(false),
    ref = useRef(null),
    { form, handleChange } = useForm();
  useEffect(() => {
    const handleSubmit = (e) => {
      setDisabled(true);
      e.preventDefault();

      setTimeout(() => {
        fetch(url, postToApi("POST", form)).then((res) => {
          if (res.ok) Navigate("/");
        });
      }, 1000);
    };

    const element = ref.current;
    element.addEventListener("submit", handleSubmit);
    return () =>
      element.removeEventListener("submit", handleSubmit);
  }, [form, Navigate]);

  return (
    // <form action="" className={s.form} ref={ref}>
    //   {formDetails.map((label) => (
    //     <label
    //       className={s["task-name-label"]}
    //       key={label.text}
    //     >
    //       {" "}
    //       {label.type === "radio" ? (
    //         <>
    //           {label.text}
    //           {`:`}
    //           <section>
    //             <label
    //               className={s["radio-label"]}
    //               name={label.name}
    //             >
    //               {" "}
    //               {label.select[0]}
    //               <input
    //                 type={label.type}
    //                 className={label.className}
    //                 name={label.name}
    //                 value={true}
    //                 onChange={(e) => handleChange(e)}
    //                 required
    //                 disabled={disabled}
    //               />
    //             </label>{" "}
    //             <label className={s["radio-label"]}>
    //               {" "}
    //               {label.select[1]}
    //               <input
    //                 type={label.type}
    //                 className={label.className}
    //                 name={label.name}
    //                 value={false}
    //                 onChange={(e) => handleChange(e)}
    //                 required
    //                 disabled={disabled}
    //               />
    //             </label>
    //           </section>
    //         </>
    //       ) : label.type === "text-area" ? (
    //         <>
    //           {" "}
    //           {label.text}:
    //           <textarea
    //             name={label.name}
    //             id={label.type}
    //             className={label.className}
    //             value={form.notes}
    //             onChange={(e) => handleChange(e)}
    //             required
    //             disabled={disabled}
    //           ></textarea>
    //         </>
    //       ) : (
    //         <>
    //           {label.text}:{" "}
    //           <input
    //             type={label.type}
    //             name={label.name}
    //             className={label.className}
    //             placeholder={label.placeholder}
    //             id={label.type}
    //             value={form[`${label.name}`]}
    //             onChange={(e) => handleChange(e)}
    //             autoComplete="on"
    //             required={
    //               label.type !== "date" ? true : false
    //             }
    //             disabled={disabled}
    //           />
    //         </>
    //       )}
    //     </label>
    //   ))}
    //   <section className={s["button-section"]}>
    //     {" "}
    //     <button
    //       className={`${s["submit-button"]} ${
    //         disabled ? s.disabled : ""
    //       }`}
    //       disabled={disabled}
    //     >
    //       {disabled ? "adding task..." : "add task"}
    //     </button>{" "}
    //   </section>
    // </form>
    <FormDetails
      disabled={disabled}
      handleChange={handleChange}
      form={form}
      myref={ref}
    />
  );
};
export default Form;
