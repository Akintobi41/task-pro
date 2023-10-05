/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
const Filter = ({ data, setData }) => {
  const [list, setList] = useState([]);
  const newVal = JSON.parse(localStorage.getItem("selected"));
  const [value, setValue] = useState(newVal || "");

  useEffect(() => {
    setList(data); // Data to be used for filter and sorting that doesn't change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // saving the selected value for the UI
    localStorage.setItem("selected", JSON.stringify(value));
  }, [value]);

  const option = [
    "--Select--",
    "All data",
    "Oldest Modifications First",
    "Favorites",
    "Completed",
    "Not Completed",
  ];

  function sortOrFilter(e) {
    const val = e.target.value;
    setValue(val);
    const result = {
      "Oldest Modifications First": [...list].sort((a, b) =>
        Number(new Date(a.modified_at)) > Number(new Date(b.modified_at))
          ? 1
          : -1,
      ),
      Favorites: [...list].filter((todo) => todo.hearted),
      Completed: [...list].filter((todo) => todo.completed),
      "Not Completed": [...list].filter((todo) => !todo.completed),
    }[val];
    console.log(list);
    console.log(result);
    setData(result || list);
  }

  return (
    <>
      <select value={value} onChange={(e) => sortOrFilter(e)}>
        {option.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default Filter;
