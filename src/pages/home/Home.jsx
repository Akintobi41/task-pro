/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import s from "./s_home.module.css";
import Loader from "../../components/preloader/Loader";
// import ChangeView from "../../components/change view/ChangeView";
// import Filter from "../../components/filter/Filter";
import usePagination from "/src/hooks/usePagination.js";
// import RefreshButton from "../../components/refreshBtn/RefreshButton";
import { allTasks } from "../../utils/endpoints";
import { useEffect, useState, lazy } from "react";
import { options } from "../../utils/options";
const ChangeView = lazy(() =>
  import("../../components/change view/ChangeView"),
);
const Filter = lazy(() => import("../../components/filter/Filter"));
const RefreshButton = lazy(() =>
  import("../../components/refreshBtn/RefreshButton"),
);
const CreateNewSection = lazy(() =>
  import("../../components/createNewSection/CreateNewSection"),
);
const ErrorDisplay = lazy(() =>
  import("../../components/errorDisplay/ErrorDisplay"),
);
const ConditionalRender = lazy(() =>
  import("../../components/conditionalRender/ConditionalRender"),
);

const Home = ({ toggle, setToggle }) => {
  let newData = [];
  try {
    newData = JSON.parse(localStorage.getItem("data"));
  } catch (error) {
    newData = [];
  }
  const [data, setData] = useState(newData);
  const [refresh, setRefresh] = useState(false);
  const [loading, isLoading] = useState(false);
  const [status, setStatus] = useState();
  const [error, setError] = useState(null);
  const [noContent, setNoContent] = useState(false);

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
        if (!res.ok) {
          console.log(res);

          throw Error(
            "No tasks available at the moment. Please try again later...",
          );
        }
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
        console.log(error);
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

  return (
    <>
      <section className={s.home}>
        {!loading && (
          <Loader loading={loading} toggle={toggle} setToggle={setToggle} />
        )}
        <section className={s["toggle-section"]}>
          {!status && (
            <>
              <Filter
                data={data}
                setData={setData}
                setExactPage={setExactPage}
                setNoContent={setNoContent}
                setError={setError}
                status={status}
              />

              <ChangeView grid={grid} setGrid={setGrid} toggle={toggle} />
            </>
          )}
        </section>

        <RefreshButton toggle={toggle} fetchData={fetchData} status={status} />
        <CreateNewSection />
        <ErrorDisplay error={error} toggle={toggle} />
        <ConditionalRender
          noContent={noContent}
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
