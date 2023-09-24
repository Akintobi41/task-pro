import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import TaskDetails from "./pages/task-details/TaskDetails";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const home_url = "https://app.asana.com/api/1.0/tasks/";
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<Home home_url={home_url} />}
            ></Route>
            <Route
              path="/create"
              element={<Create />}
            ></Route>
            <Route
              path={`/:id`}
              element={<TaskDetails home_url={home_url} />}
            ></Route>
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
