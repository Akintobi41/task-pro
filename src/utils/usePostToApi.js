const apiKey = import.meta.env.VITE_PRIVATE_KEY,
  gidKey = import.meta.env.VITE_GID_KEY;
export const postToApi = (...args) => {
  const [method, task] = args,
    { name, completed, due_date, liked, notes, start_date } = task;

  return method === "POST"
    ? {
      method: method,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          name: name,
          completed: completed,
          due_on: due_date,
          liked: liked,
          notes: notes,
          start_on: start_date,
          projects: `${[gidKey]}`,
        },
      }),
    }
    : {
      method: method,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          name: name,
          completed: completed,
          due_on: due_date,
          liked: liked,
          notes: notes,
          start_on: start_date,
        },
      }),
    };
};

export const deleteOptions = {
  method: "DELETE",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    authorization: `Bearer ${apiKey}`,
  },
};
