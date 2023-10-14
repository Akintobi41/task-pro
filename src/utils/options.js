const apiKey = import.meta.env.VITE_APP_PRIVATE_KEY;
export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${apiKey}`,
  },
};
