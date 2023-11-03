import "./App.css";
import Layout from "./components/layout/Layout";
import Create from "./pages/create/Create";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import Deleted from "./pages/deleted/Deleted";
const Home = lazy(() => import("./pages/home/Home"));
const TaskDetails = lazy(() => import("./pages/taskDetails/TaskDetails"));
const DarkMode = lazy(() => import("./components/dark-mode/DarkMode"));

function App() {
  let deletedHistory = [];
  try {
    //Attempt to parse the data from localStorage
    deletedHistory = JSON.parse(localStorage.getItem("history"));
  } catch (error) {
    // handle errors
    deletedHistory = []; // default value
  }

  const darkMode = JSON.parse(localStorage.getItem("mode"));
  const [toggle, setToggle] = useState(darkMode);
  const [recentlyDeleted, setRecentlyDeleted] = useState(deletedHistory);
  const [errorMsg, setErrorMsg] = useState(false);
  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(toggle));
    localStorage.setItem("history", JSON.stringify(recentlyDeleted));
  }, [toggle, recentlyDeleted]);

  return (
    <div>
      <Router>
        <Suspense fallback={<h1>Loading</h1>}>
          <Layout toggle={toggle}>
            <DarkMode toggle={toggle} setToggle={setToggle} />
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    toggle={toggle}
                    recentlyDeleted={recentlyDeleted}
                    deletedHistory={deletedHistory}
                  />
                }
              />
              <Route
                path="/create"
                element={
                  <Create
                    toggle={toggle}
                    errorMsg={errorMsg}
                    setErrorMsg={setErrorMsg}
                  />
                }
              />
              <Route
                path={`/:id`}
                element={
                  <TaskDetails
                    toggle={toggle}
                    recentlyDeleted={recentlyDeleted}
                    setRecentlyDeleted={setRecentlyDeleted}
                    errorMsg={errorMsg}
                    setErrorMsg={setErrorMsg}
                  />
                }
              />
              <Route
                path="/deleted"
                element={
                  <Deleted
                    recentlyDeleted={recentlyDeleted}
                    setRecentlyDeleted={setRecentlyDeleted}
                    toggle={toggle}
                  />
                }
              />
            </Routes>
          </Layout>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
