import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/create"
              element={<Create />}
            ></Route>
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
