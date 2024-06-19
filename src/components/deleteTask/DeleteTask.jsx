/* eslint-disable react/prop-types */
const DeleteTask = ({ deleted, s, setDialogue }) => {
  function handleDelete() {
    setDialogue(true);
  }

  return (
    <>
      <button value="delete" className={s.delete} onClick={handleDelete}>
        {deleted ? "Deleting Task..." : "Delete Task"}
      </button>
    </>
  );
};

export default DeleteTask;
