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
        <Layout toggle={toggle}>
          <DarkMode toggle={toggle} setToggle={setToggle} />
          <Routes>
            <Route
              path="/"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{ minHeight: "100vh", background: "#60534659" }}
                    ></div>
                  }
                >
                  <Home
                    toggle={toggle}
                    recentlyDeleted={recentlyDeleted}
                    deletedHistory={deletedHistory}
                  />
                </Suspense>
              }
            ></Route>

            <Route
              path="/create"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{ minHeight: "100vh", background: "#60534659" }}
                    ></div>
                  }
                >
                  <Create
                    toggle={toggle}
                    errorMsg={errorMsg}
                    setErrorMsg={setErrorMsg}
                  />
                </Suspense>
              }
            />

            <Route
              path={`/:id`}
              element={
                <Suspense
                  fallback={
                    <div
                      style={{ minHeight: "100vh", background: "#60534659" }}
                    ></div>
                  }
                >
                  <TaskDetails
                    toggle={toggle}
                    recentlyDeleted={recentlyDeleted}
                    setRecentlyDeleted={setRecentlyDeleted}
                    errorMsg={errorMsg}
                    setErrorMsg={setErrorMsg}
                  />
                </Suspense>
              }
            />

            <Route
              path="/deleted"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{ minHeight: "100vh", background: "#60534659" }}
                    ></div>
                  }
                >
                  <Deleted
                    recentlyDeleted={recentlyDeleted}
                    setRecentlyDeleted={setRecentlyDeleted}
                    toggle={toggle}
                  />
                </Suspense>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
