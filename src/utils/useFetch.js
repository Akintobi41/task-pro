// // /* eslint-disable react-hooks/exhaustive-deps */
// // import { useEffect, useState } from "react";
// import { options } from "./options";

// // const useFetch = (url) => {
// //   const newData = JSON.parse(localStorage.getItem("data"));
// //   const [data, setData] = useState(newData);
// //   const [refresh, setRefresh] = useState(false);
// //   const [loading, isLoading] = useState(false);
// //   const [status, setStatus] = useState();
// //   const [error, setError] = useState(null);
// //   useEffect(() => {
// //     localStorage.setItem("data", JSON.stringify(data));
// //   }, []);

// //   useEffect(() => {
// //     // check localStorage and set State if there is data found in the localStorage

// //     if (newData?.length) {
// //       setData(newData);
// //       isLoading(true);
// //     } else {
// //       // Process tasks from the server.
// //       fetchData();
// //       console.log('fetching data')
// //     }
// //   }, []);

// //   if (refresh) {
// //     localStorage.setItem("data", JSON.stringify(data));
// //   }

// //   function fetchData() {
// //     setData([]);
// //     isLoading(false);
// //     fetch(url, options)
// //       .then((res) => {
// //         // Check if the response is OK; otherwise, throw an error
// //         if (!res.ok)
// //           throw Error(
// //             "No tasks available at the moment. Please try again later...",
// //           );
// //         return res.json();
// //       })
// //       .then((res) => {
// //         isLoading(true);
// //         setData(res.data);
// //         setRefresh(true);
// //         setError(false);
// //         if (!res.data.length) setStatus(true);
// //       })
// //       .catch((err) => {
// //         isLoading(true);
// //         setError(err.message);
// //       });
// //   }

// //   return { data, loading, error, status, setData, fetchData };
// // };
// // export default useFetch;

// // /* eslint-disable react-hooks/exhaustive-deps */
// // import { useEffect, useState } from "react";
// // import { options } from "./options";

// // const useFetch = (url, onDataFetched) => {
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [status, setStatus] = useState();
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     // Process tasks from the server.
// //     fetchData();
// //   }, []);

// //   function fetchData() {
// //     setLoading(true);
// //     setData([]); // Clear existing data when fetching new data.
// //     fetch(url, options)
// //       .then((res) => {
// //         if (!res.ok) {
// //           throw new Error("No tasks available at the moment. Please try again later.");
// //         }
// //         return res.json();
// //       })
// //       .then((res) => {
// //         if (res.data.length === 0) {
// //           setStatus(true);// figure out what it is doing and let the state name reflect it
// //         }
// //         onDataFetched(res.data); // Pass the data to the provided callback.
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setError(err.message);
// //         setLoading(false);
// //       });
// //   }

// //   return { data, loading, error, status, fetchData };
// // };

// // export default useFetch;
// import { useEffect, useState } from "react";
// import { options } from "./options";

// const STORAGE_KEY = "yourDataKey"; // Define a consistent key for data storage

// const useFetch = (url, onDataFetched) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState();
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Try to fetch data from localStorage on component initialization
//     const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
//     if (storedData) {
//       onDataFetched(storedData);
//       console.log(storedData)
//     }

//     // Then proceed to fetch fresh data from the server
//     fetchData();
//   }, []);

//   function fetchData() {
//     setLoading(true);
//     setData([]); // Clear existing data when fetching new data.
//     fetch(url, options)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("No tasks available at the moment. Please try again later.");
//         }
//         return res.json();
//       })
//       .then((res) => {
//         if (res.data.length === 0) {
//           setStatus(true);
//         }
//         onDataFetched(res.data); // Pass the data to the provided callback.
//         saveDataLocally(res.data); // Save the data to localStorage
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }

//   function saveDataLocally(data) {
//     // Save the fetched data to localStorage
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
//   }

//   return { data, loading, error, status, fetchData };
// };

// export default useFetch;
