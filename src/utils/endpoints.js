export const apiKey = import.meta.env.VITE_APP_PRIVATE_KEY
export const gidKey = import.meta.env.VITE_APP_GID_KEY;
const BASE_URL = import.meta.env.VITE_APP_BASE_URL

export const allTasks = `${BASE_URL}?limit=50&project=1205465631047325&opt_fields=completed,created_at,due_on,followers,hearted,projects.name,modified_at,followers,name,notes`;
