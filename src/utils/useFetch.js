/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { options } from "./options";

const useFetch = (url, method) => {
    const newData = JSON.parse(localStorage.getItem("data"));
    const [data, setData] = useState(newData);
    const [loading, isLoading] = useState(false);
    const [status, setStatus] = useState();
    const [error, setError] = useState(null);
    // const apiKey = import.meta.env.VITE_PRIVATE_KEY;

    useEffect(() => {
        localStorage;
        localStorage.setItem("data", JSON.stringify(data));

    }, [data]);

    useEffect(() => {
        // check localStorage and set State if there is data found in the localStorage
        if (newData.length) {
            setData(newData);
            isLoading(true)
        } else {
            // Process tasks from the server.
            fetchData()
        }
        // console.log(data);
    }, []);

    function fetchData() {
        setData([])
        isLoading(false)
        fetch(url, options)
            .then((res) => {
                // Check if the response is OK; otherwise, throw an error
                if (!res.ok)
                    throw Error(
                        "No tasks available at the moment. Please try again later...",
                    );
                return res.json();
            })
            .then((res) => {
                isLoading(true);
                setData(res.data);
                setError(false);
                if (!res.data.length) setStatus(true);
            })
            .catch((err) => {
                isLoading(true);
                setError(err.message);
            });
    }
    return { data, loading, error, status, setData, fetchData };
};
export default useFetch;
