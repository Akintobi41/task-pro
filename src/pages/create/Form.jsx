/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import FormDetails from "./FormDetails";
import useForm from "/src/utils/useForm";
import { allTasks } from "../../utils/endpoints";
import useDataApiHandler from "../../utils/useApiDataHandler";

const Form = ({ toggle, errorMsg, setErrorMsg }) => {
  const [disabled, setDisabled] = useState(false);
  const ref = useRef(null);
  const { form, handleChange } = useForm();
  const { updateData } = useDataApiHandler(form);

  useEffect(() => {
    // setErrorMsg(false);
    const handleSubmit = (e) => {
      e.preventDefault();
      setDisabled(true);
      updateData("POST", allTasks);
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
