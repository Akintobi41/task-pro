/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import FormDetails from "./FormDetails";
import useForm from "/src/hooks/useForm.js";
import { allTasks } from "../../utils/endpoints";
import useDataApiHandler from "../../hooks/useApiDataHandler";
// import s from "./s_create.module.css";

const Form = ({ toggle, errorMsg, setErrorMsg }) => {
  const [disabled, setDisabled] = useState(false);
  const ref = useRef(null);
  const { form, handleChange } = useForm();
  const { updateData, errorValues, setErrorValues } = useDataApiHandler(form);
  // let newEl;

  useEffect(() => {
    const handleSubmit = (e) => {
      e.preventDefault();
      setDisabled(true);
      updateData("POST", allTasks);
      setErrorValues();
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
      errorValues={errorValues}
      setDisabled={setDisabled}
      setErrorValues={setErrorValues}
    />
  );
};
export default Form;
