import s from "./s_create.module.css";
export const formDetails = [
  {
    text: "Task Name",
    type: "text",
    name: "name",
    className: `${s.input} ${s["task-name"]}`,
    placeholder: "i.e Bug Task",
  },
  {
    text: "Add a Note",
    name: "notes",
    type: "text-area",
    className: s["text-area"],
  },
  {
    text: "Start date",
    type: "date",
    name: "start_date",
    className: `${s.input}`,
  },
  {
    text: "Due date",
    type: "date",
    name: "due_date",
    className: `${s.input}`,
  },
  {
    text: "Add to Favorites",
    type: "radio",
    name: "liked",
    className: `${s.input} ${s.radio}`,
    select: ["Yes", "No"],
  },
  {
    text: "Completed",
    type: "radio",
    name: "completed",
    className: `${s.input} ${s.radio}`,
    select: ["Yes", "No"],
  },
];
