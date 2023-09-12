import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";

function App() {
  // const apiUrl = "https://app.asana.com/api/1.0/";
  // const apiKey = import.meta.env.VITE_PRIVATE_KEY;
  // const gidKey = import.meta.env.VITE_GID_KEY;

  // const options = {
  //   method: "POST",
  //   headers: {
  //     accept: "application/json",
  //     "content-type": "application/json",
  //     authorization:
  //       "Bearer 1/1205465561564329:afc2ee5641ca2eecaf89c6b5ad721de0",
  //   },
  //   // body: JSON.stringify({ data: { name: "Bug Task" } }),
  // };

  // fetch(
  //   "https://app.asana.com/api/1.0/tasks?project=1205465631047325",
  //   options
  // )
  //   .then((response) => response.json())
  //   .then((response) => console.log(response))
  //   .catch((err) => console.error(err));

  return (
    <div>
      <Layout>
        <Home />
      </Layout>
    </div>
  );
}

export default App;
