import { useState, useRef, useEffect } from "react";
// import s from "./s_create.module.css";
// import { formDetails } from "./form_details";
import { postToApi } from "../../usePostToApi";
import { useNavigate } from "react-router-dom";
import FormDetails from "./FormDetails";
import useForm from "../../useForm";
const Form = ({ toggle }) => {
  const url = "https://app.asana.com/api/1.0/tasks",
    Navigate = useNavigate(),
    [disabled, setDisabled] = useState(false),
    ref = useRef(null),
    { form, handleChange } = useForm();
  useEffect(() => {
    const handleSubmit = (e) => {
      setDisabled(true);
      e.preventDefault();

      fetch(url, postToApi("POST", form))
        .then((res) => {
          if (res.ok) Navigate("/");
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    };

    const element = ref.current;
    element.addEventListener("submit", handleSubmit);
    return () => element.removeEventListener("submit", handleSubmit);
  }, [form, Navigate]);

  return (
    <FormDetails
      disabled={disabled}
      handleChange={handleChange}
      form={form}
      myref={ref}
      toggle={toggle}
    />
  );
};
export default Form;
