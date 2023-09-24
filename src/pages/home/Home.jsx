import s from "./s_home.module.css";
import Loader from "../../components/preloader/Loader";
import useFetch from "../../useFetch";
import { Link, useParams } from "react-router-dom";
import { date } from "./u_home";

const Home = ({ home_url }) => {
  const url =
    "https://app.asana.com/api/1.0/tasks?limit=50&project=1205465631047325&opt_fields=completed,created_at,due_on,followers,hearted,projects.name,modified_at,followers,name,notes";
  const { data, loading, error, status } = useFetch(
    url,
    "GET"
  );

  return (
    <section className={s.home}>
      {loading && <Loader loading={loading} />}
      {error && (
        <p className={s["error"]}>Failed to fetch</p>
      )}
      {status && (
        <section className={s["create-new"]}>
          {" "}
          <p className={s["create-new-text"]}>
            No tasks created yet, ready to personalize ?
            <Link
              to="/create"
              className={s["create-new-link"]}
            >
              {" "}
              Let{`'`}s get started
            </Link>
          </p>
        </section>
      )}

      <section className={s["task-wrapper"]}>
        {data.map((task, i) => {
          return (
            <Link
              to={`${data[i].gid}`}
              className={s.task}
              key={task.gid}
              style={{
                backgroundColor: `${
                  task.completed ? "#f4ecdf" : " #e74c3c"
                }`,
                color: `${
                  task.completed ? "#141824" : "#f4ecdf"
                }`,
              }}
            >
              <p className={s.title}>
                {task.projects[0].name}
              </p>
              <p className={s["task-name"]}>
                {task.name.length > 26
                  ? task.name.slice(0, 26) + "..."
                  : task.name}
              </p>{" "}
              <p className={s.notes}>
                {task.notes.length > 20
                  ? task.notes.slice(0, 20) + "..."
                  : task.note}
              </p>
              <h4 className={s.modified_at}>
                Last modified : {date(task["modified_at"])}
              </h4>
              <h4 className={s["due_on"]}>
                Due on :{" "}
                {new Date(task["due_on"]).toDateString()}
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
    </section>
  );
};

export default Home;
