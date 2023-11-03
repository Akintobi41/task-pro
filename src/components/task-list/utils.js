const setBg = (t, toggle) => {
  return !t.completed && toggle
    ? "#972111"
    : t.completed && toggle
      ? "#f5eee3"
      : t.completed
        ? "#f4ecdf"
        : "#972111";
};
const setCol = (t) => (t.completed ? "#141824" : "#f4ecdf");
const shrinkName = (t) =>
  t.name.length > 26 ? t.name.slice(0, 26) + "..." : t.name;
const shrinkNote = (t) =>
  t.notes.length > 20 ? t.notes.slice(0, 20) + "..." : t.note;

export { setBg, setCol, shrinkName, shrinkNote };
