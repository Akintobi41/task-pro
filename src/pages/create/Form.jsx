/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import FormDetails from "./FormDetails";
import useForm from "/src/hooks/useForm.js";
import { allTasks } from "../../utils/endpoints";
import useDataApiHandler from "../../hooks/useApiDataHandler";

const Form = ({ toggle, errorMsg, setErrorMsg }) => {
  const ref = useRef(null);
  const { form, handleChange } = useForm();
  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = useState(true);
  const { updateData, errorValues, setErrorValues } = useDataApiHandler(form);

  useEffect(() => {
    const handleSubmit = (e) => {
      e.preventDefault();
      updateData("POST", allTasks);
      setErrorValues({ ...errorValues, response: true, disabled: true });
    };

    const element = ref.current;
    element.addEventListener("submit", handleSubmit);
    return () => element.removeEventListener("submit", handleSubmit);
  }, [form]);

  return (
    <FormDetails
      handleChange={handleChange}
      disabled={disabled}
      form={form}
      myref={ref}
      toggle={toggle}
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
      errorValues={errorValues}
      setErrorValues={setErrorValues}
    />
  );
};
export default Form;
