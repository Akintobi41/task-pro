/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import s from "./s_Filter.module.css";
const Filter = ({ data, setData, setExactPage, setNoContent, setError }) => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    setList(data); // Data to be used for filter and sorting that doesn't change
    setNoContent(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const option = [
    "--Select--",
    "All data",
    "Oldest Modifications First",
    "Latest Modifications First",
    "Favorites",
    "Completed",
    "Not Completed",
  ];

  function sortOrFilter(e) {
    setError(false);
    const val = e.target.value;
    setValue(val);
    const result = {
      "Oldest Modifications First": [...list].sort((a, b) =>
        Number(new Date(a.modified_at)) > Number(new Date(b.modified_at))
          ? 1
          : -1,
      ),
      "Latest Modifications First": [...list].sort((a, b) =>
        Number(new Date(a.modified_at)) < Number(new Date(b.modified_at))
          ? 1
          : -1,
      ),
      Favorites: [...list].filter((todo) => todo.hearted),
      Completed: [...list].filter((todo) => todo.completed),
      "Not Completed": [...list].filter((todo) => !todo.completed),
      "All data": [...list],
    }[val];
    if (!result || result.length === 0) {
      setNoContent(true);
      setData(list);
      console.log(result);
      console.log(list);
    } else {
      setNoContent(false);
      setData(result);
    }
    setExactPage(1);
  }

  return (
    <>
      <select
        value={value}
        onChange={(e) => sortOrFilter(e)}
        className={s.select}
      >
        {option.map((option) => (
          <option
            key={option}
            value={option}
            disabled={option === "--Select--"}
          >
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default Filter;
