import { useState } from "react";

const useForm = () => {
  const [form, setForm] = useState({
      name: "",
      completed: "",
      due_date: "",
      liked: "",
      notes: "",
      start_date: "",
    }),
    handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };

  return { form, setForm, handleChange };
};
export default useForm;
