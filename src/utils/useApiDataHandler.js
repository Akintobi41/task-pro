import { gidKey, apiKey } from "./endpoints";
import { useNavigate } from "react-router";

const useDataApiHandler = (task) => {

  const { name, completed, due_date, liked, notes } = task;
  const Navigate = useNavigate()

  function updateData(method, url) {
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
        if (!res.ok) {
          throw Error('unable to complete task')
        }
        Navigate('/')
        return res.json()

      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }
  return { updateData }
};
export default useDataApiHandler

