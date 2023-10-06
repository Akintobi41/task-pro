/* eslint-disable react/prop-types */
import s from "./s_home.module.css";
import Loader from "../../components/preloader/Loader";
import useFetch from "/src/utils/useFetch.js";
import { Link } from "react-router-dom";
import TaskList from "../../components/task-list/TaskList";
import { useState } from "react";
import ChangeView from "../../components/change view/ChangeView";
import Filter from "../../components/filter/Filter";
import RefreshButton from "../../components/refreshBtn/RefreshButton";
const Home = ({ home_url, toggle, setToggle }) => {
  const url = `${home_url}?limit=50&project=1205465631047325&opt_fields=completed,created_at,due_on,followers,hearted,projects.name,modified_at,followers,name,notes`;
  const { data, loading, error, status, setData, fetchData } = useFetch(
    url,
    "GET",
  );
  const [grid, setGrid] = useState(false);
  console.log(loading);

  return (
    <>
      <section className={s.home}>
        {!loading && (
          <Loader loading={loading} toggle={toggle} setToggle={setToggle} />
        )}
        {error && (
          <p className={`${s["error"]} ${toggle ? s["error-dark"] : ""}`}>
            Failed to fetch data...
          </p>
        )}
        {status && (
          <section className={s["create-new"]}>
            {" "}
            <p className={s["create-new-text"]}>
              No tasks created yet, ready to personalize ?
              <Link to="/create" className={s["create-new-link"]}>
                {" "}
                Let{`'`}s get started
              </Link>
            </p>
          </section>
        )}
        {data.length ? (
          <section className={s["toggle-section"]}>
            <Filter data={data} setData={setData} />
            <ChangeView grid={grid} setGrid={setGrid} toggle={toggle} />
          </section>
        ) : (
          false
        )}
        <RefreshButton toggle={toggle} fetchData={fetchData} />
        <TaskList
          loading={loading}
          status={status}
          data={data}
          setData={setData}
          grid={grid}
          toggle={toggle}
        />
      </section>
    </>
  );
};

export default Home;
