/* eslint-disable react/prop-types */
import s from "./s_home.module.css";
import Loader from "../../components/preloader/Loader";
import useFetch from "/src/utils/useFetch.js";
import { Link } from "react-router-dom";
import TaskList from "../../components/task-list/TaskList";
import { useState } from "react";
import ChangeView from "../../components/change view/ChangeView";
import Filter from "../../components/filter/Filter";
import usePagination from "../../utils/usePagination";
import RefreshButton from "../../components/refreshBtn/RefreshButton";
const Home = ({ home_url, toggle, setToggle }) => {
  const url = `${home_url}?limit=50&project=1205465631047325&opt_fields=completed,created_at,due_on,followers,hearted,projects.name,modified_at,followers,name,notes`;
  const { data, loading, error, status, setData, fetchData } = useFetch(url);
  const [grid, setGrid] = useState(false);
  const {
    handleNext,
    totalPages,
    handlePrevious,
    currentItems,
    endIndex,
    exactPage,
    setExactPage,
  } = usePagination(data);

  return (
    <>
      <section className={s.home}>
        {!loading && (
          <Loader loading={loading} toggle={toggle} setToggle={setToggle} />
        )}

        {data.length ? (
          <section className={s["toggle-section"]}>
            <Filter data={data} setData={setData} setExactPage={setExactPage} />
            <ChangeView grid={grid} setGrid={setGrid} toggle={toggle} />
          </section>
        ) : (
          false
        )}
        {!status && <RefreshButton toggle={toggle} fetchData={fetchData} />}
        {status && (
          <section className={s["create-new"]}>
            {" "}
            <p
              className={`${s["create-new-text"]} ${
                toggle ? s["create-text-dark"] : ""
              }`}
            >
              No tasks created yet, ready to personalize ?
              <Link
                to="/create"
                className={`${s["create-new-link"]} ${
                  toggle ? s["create-text-dark"] : ""
                }`}
              >
                {" "}
                Let{`'`}s get started
              </Link>
            </p>
          </section>
        )}
        {error && (
          <p className={`${s["error"]} ${toggle ? s["error-dark"] : ""}`}>
            Failed to fetch data...
          </p>
        )}
        <TaskList
          loading={loading}
          status={status}
          data={data}
          setData={setData}
          grid={grid}
          toggle={toggle}
          currentItems={currentItems}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          endIndex={endIndex}
          totalPages={totalPages}
          exactPage={exactPage}
        />
      </section>
    </>
  );
};

export default Home;
