/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { postToApi } from "/src/utils/usePostToApi.js";
import { useNavigate } from "react-router-dom";
import FormDetails from "./FormDetails";
import useForm from "/src/utils/useForm";
const Form = ({ toggle, home_url, errorMsg, setErrorMsg }) => {
  const Navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const ref = useRef(null);
  const { form, handleChange } = useForm();

  useEffect(() => {
    setErrorMsg(false);
    const handleSubmit = (e) => {
      e.preventDefault();
      const checkDate =
        Date.parse(form["start_date"]) < Date.parse(form["due_date"]);
      // Check if start date is greater than due date  before creating task
      if (checkDate) {
        setDisabled(true);
        setErrorMsg(false);
        fetch(home_url, postToApi("POST", form))
          .then((res) => {
            if (res.ok) Navigate("/");
          })
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
      } else {
        setErrorMsg(true);
      }
    };

    const element = ref.current;
    element.addEventListener("submit", handleSubmit);
    return () => element.removeEventListener("submit", handleSubmit);
  }, [form]);

  return (
    <FormDetails
      disabled={disabled}
      handleChange={handleChange}
      form={form}
      myref={ref}
      toggle={toggle}
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
    />
  );
};
export default Form;
