import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import TaskDetails from "./pages/taskDetails/TaskDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import DarkMode from "./components/dark-mode/DarkMode";
import Deleted from "./pages/deleted/Deleted";

function App() {
  const home_url = import.meta.env.VITE_APP_BASE_URL;
  const darkMode = JSON.parse(localStorage.getItem("mode"));
  const deletedHistory = JSON.parse(localStorage.getItem("history"));
  const [toggle, setToggle] = useState(darkMode);
  const [recentlyDeleted, setRecentlyDeleted] = useState(deletedHistory || []);
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(toggle));
    localStorage.setItem("history", JSON.stringify(recentlyDeleted));
  }, [toggle, recentlyDeleted]);

  return (
    <div>
      <Router>
        <Layout toggle={toggle}>
          <DarkMode toggle={toggle} setToggle={setToggle} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  home_url={home_url}
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
                  home_url={home_url}
                  errorMsg={errorMsg}
                  setErrorMsg={setErrorMsg}
                />
              }
            />
            <Route
              path={`/:id`}
              element={
                <TaskDetails
                  home_url={home_url}
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
      </Router>
    </div>
  );
}

export default App;
