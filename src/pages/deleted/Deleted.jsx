/* eslint-disable react/prop-types */
import { useEffect } from "react";
import s from "./s_Deleted.module.css";
const Deleted = ({ recentlyDeleted, setRecentlyDeleted, toggle }) => {
  function clear(item) {
    const temp = [...recentlyDeleted];
    temp.splice(item, 1);
    setRecentlyDeleted(temp);
  }
  useEffect(() => {}, [recentlyDeleted]);
  return (
    <section className={s["deleted-section"]}>
      <small className={` ${s.small} ${toggle ? s["dark"] : ""}`}>
        Recently Deleted Tasks
      </small>
      {!recentlyDeleted.length && (
        <p className={` ${s.small} ${s.p} ${toggle ? s["dark"] : ""}`}>
          No tasks to display
        </p>
      )}
      {recentlyDeleted.length != "0" && (
        <table className={`${s["items"]} ${toggle ? s["items-dark"] : ""}`}>
          <tbody>
            <tr>
              <th>Task</th>
              <th>Date</th>
              <th>
                Id{" "}
                <span className={s["toolTip-container"]}>
                  <img
                    src="/Images/icons8-delete-all-50.png"
                    alt="delete-all-permanently"
                    className={s["bin-all"]}
                  />
                  <span className={s["tool-tipText"]}>Delete All</span>
                </span>
              </th>
            </tr>
            {recentlyDeleted.map((item) => (
              <tr key={item.gid}>
                <td className={s.td}>{item.name}</td>
                <td className={s.td}>
                  {new Date(item["created_at"]).toDateString()}
                </td>
                <td className={s.td}>
                  {item.gid}{" "}
                  <img
                    src="/Images/icons8-bin-50.png"
                    alt="delete-permanently"
                    className={s.bin}
                    onClick={() => clear(item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Deleted;
