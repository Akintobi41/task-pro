/* eslint-disable react/prop-types */
import s from "../../pages/home/s_home.module.css";
import TaskList from "../task-list/TaskList";
const ConditionalRender = ({
  noContent,
  loading,
  toggle,
  status,
  data,
  setData,
  grid,
  currentItems,
  handleNext,
  handlePrevious,
  endIndex,
  totalPages,
  exactPage,
}) => {
  return (
    <>
      {!noContent ? (
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
      ) : loading ? (
        <p
          className={` ${s["no-result"]} ${toggle ? s["no-result-dark"] : ""}`}
        >
          No results found
        </p>
      ) : null}
    </>
  );
};

export default ConditionalRender;
