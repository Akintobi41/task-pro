/* eslint-disable react/prop-types */
import s from "./s_ChangeView.module.css";
import { gridType } from "./u_ChangeView";
const ChangeView = ({ grid, setGrid, toggle }) => {
  const viewType = gridType(grid, toggle, s);
  return (
    <section className={s["wrapper"]}>
      {viewType.map((item) => (
        <section
          className={item.class}
          key={item.id}
          onClick={() => setGrid(item.value)}
        >
          {toggle ? (
            <img src={item.src1} alt={item.alt1} className={item.className1} />
          ) : (
            <img src={item.src2} alt={item.alt2} className={item.className2} />
          )}
        </section>
      ))}
    </section>
  );
};

export default ChangeView;
