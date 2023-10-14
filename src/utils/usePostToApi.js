import { gidKey, apiKey } from "./endpoints";

export const postToApi = (method, task) => {
  const { name, completed, due_date, liked, notes, start_date } = task;

  return {
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
            start_on: start_date,
            ...(method === 'POST' ? { projects: `${[gidKey]}` } : {})
          },
        })
      }),
  }
};

export const deleteOptions = {
  method: "DELETE",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    authorization: `Bearer ${apiKey}`,
  },
};
