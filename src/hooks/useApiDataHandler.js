import { gidKey, apiKey } from "../utils/endpoints";
import { useNavigate } from "react-router";
import { useState } from "react";

const useDataApiHandler = (task) => {

  const { name, completed, due_date, liked, notes } = task;
  const [errorValues, setErrorValues] = useState({ response: true, disabled: false, message: '' })
  const Navigate = useNavigate()
  const [res, setRes] = useState()

  function updateData(method, url) {
    setErrorValues({ ...errorValues, response: true, disabled: true })
    console.log(errorValues)
    const options = {
      method: method,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      ...(method === 'DELETE' ? {} :
        {
          body: JSON.stringify({
            data: {
              name: name,
              completed: completed,
              due_on: due_date,
              liked: liked,
              notes: notes,
              ...(method === 'POST' ? { projects: `${[gidKey]}` } : {})
            },
          })
        }),
    }

    fetch(url, options)
      .then((res) => {
        setRes(res)
        if (!res.ok) {
          throw Error('unable to complete task')
        }
        Navigate('/')
        setErrorValues({ ...errorValues, disabled: false })
        return res.json()

      })
      .then((res) => console.log(res))
      .catch((error) => {
        setRes(res)
        console.log(error.message)
        setErrorValues({ response: false, disabled: false, message: error.message })
      })
  }
  return { updateData, errorValues, setErrorValues, res }
};
export default useDataApiHandler
