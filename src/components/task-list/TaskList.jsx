/* eslint-disable react/prop-types */
import s from "./s_TaskList.module.css";
import { Link } from "react-router-dom";
import { date } from "/src/pages/home/u_home.js";
import { setBg, setCol, shrinkName, shrinkNote } from "./utils";
import usePagination from "/src/utils/usePagination.js";
import Footer from "../../components/footer/Footer";

const TaskList = ({ data, status, grid, toggle }) => {
  const { handleNext, handlePrevious, currentItems, endIndex } =
    usePagination(data);
  return (
    <>
      <section
        className={`${s["task-wrapper"]} ${
          grid ? s["task-wrapper-list"] : s["task-wrapper-grid"]
        }`}
      >
        {currentItems?.map((task, i) => {
          return (
            <Link
              to={`${data[i]?.gid}`}
              className={`${s.task} ${grid ? s["task-list"] : s["task-grid"]} ${
                toggle ? s["task-dark"] : ""
              }`}
              key={task.gid}
              style={{
                backgroundColor: setBg(task, toggle),
                color: setCol(task),
              }}
            >
              <p className={s.title}>{task.projects[0].name}</p>
              <p className={s["task-name"]}>{shrinkName(task)}</p>{" "}
              <p className={s.notes}>{shrinkNote(task)}</p>
              <h4 className={s.modified_at}>
                Last modified : {date(task["modified_at"])}
              </h4>
              <h4 className={s["due_on"]}>
                Due on : {new Date(task["due_on"]).toDateString()}
              </h4>
              <section className={s["task-created"]}>
                <section className={s["date-section"]}>
                  <img
                    src="/public/Images/calendar.png"
                    alt="created_at"
                    className={s.calendar}
                  />{" "}
                  <small className={s["date-created"]}>
                    {" "}
                    {date(task["created_at"])}
                  </small>
                </section>
                <section className={s["followers-section"]}>
                  <img
                    src="/public/Images/user.png"
                    alt="followers"
                    className={s["followers-img"]}
                  />
                  <p className={s["followers-length"]}>
                    {task.followers.length}
                  </p>
                </section>
              </section>
            </Link>
          );
        })}
      </section>
      {!status && data.length ? (
        <Footer
          data={data}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          endIndex={endIndex}
          toggle={toggle}
        />
      ) : (
        false
      )}
    </>
  );
};

export default TaskList;
