/* eslint-disable react/prop-types */
import s from "./s_Deleted.module.css";
const Deleted = ({ recentlyDeleted, setRecentlyDeleted }) => {
  console.log([...recentlyDeleted].map((item) => item));

  return (
    <section className={s["deleted-section"]}>
      <small>Recently Deleted Tasks</small>
      <table className={s["items"]}>
        <tbody>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>
              id{" "}
              <img
                src="/public/Images/icons8-delete-all-50.png"
                alt="delete-all-permanently"
                className={s["bin-all"]}
              />
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
                  src="/public/Images/icons8-bin-50.png"
                  alt="delete-permanently"
                  className={s.bin}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Deleted;
