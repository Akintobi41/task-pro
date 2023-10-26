/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import s from "./s_home.module.css";
import Loader from "../../components/preloader/Loader";
import { Link } from "react-router-dom";
import TaskList from "../../components/task-list/TaskList";
import ChangeView from "../../components/change view/ChangeView";
import Filter from "../../components/filter/Filter";
import usePagination from "../../utils/usePagination";
import RefreshButton from "../../components/refreshBtn/RefreshButton";
import { allTasks } from "../../utils/endpoints";
import { useEffect, useState } from "react";
import { options } from "../../utils/options";

const Home = ({ toggle, setToggle }) => {
  const newData = JSON.parse(localStorage.getItem("data"));
  const [data, setData] = useState(newData);
  const [refresh, setRefresh] = useState(false);
  const [loading, isLoading] = useState(false);
  const [status, setStatus] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
    // check localStorage and set State if there is data found in the localStorage
    if (newData?.length) {
      setData(newData);
      isLoading(true);
    } else {
      // Process tasks from the server.
      fetchData();
    }
  }, []);

  if (refresh) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  function fetchData() {
    setData([]);
    isLoading(false);
    fetch(allTasks, options)
      .then((res) => {
        // Check if the response is OK; otherwise, throw an error
        if (!res.ok)
          throw Error(
            "No tasks available at the moment. Please try again later...",
          );
        return res.json();
      })
      .then((res) => {
        isLoading(true);
        setData(res.data);
        setRefresh(true);
        setError(false);
        if (!res.data.length) setStatus(true);
      })
      .catch((err) => {
        isLoading(true);
        setError(err.message);
      });
  }

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
  console.log(data, "data");
  console.log(newData, "newData");

  return (
    <>
      <section className={s.home}>
        {!loading && (
          <Loader loading={loading} toggle={toggle} setToggle={setToggle} />
        )}

        {data?.length ? (
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
