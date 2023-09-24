import { useEffect, useState } from "react";

const useFetch = (url, method) => {
    const [data, setData] = useState([]),
        [loading, isLoading] = useState(true),
        [status, setStatus] = useState(),
        [error, setError] = useState(null),
        apiKey = import.meta.env.VITE_PRIVATE_KEY;


    useEffect(() => {
        const options = {
            method: method,
            headers: {
                accept: "application/json",
                authorization:
                    `Bearer ${apiKey}`,
            }
        }




        setTimeout(() => {
            // Process tasks from the server.
            fetch(
                url,
                options
            )
                .then((res) => {
                    // Check if the response is OK; otherwise, throw an error
                    if (!res.ok) throw Error('No tasks available at the moment. Please try again later...')
                    return res.json()
                })
                .then((res) => {
                    isLoading(false)
                    setData(res.data)
                    setError(null)
                    if (!res.data.length) setStatus(true)
                }).catch((err) => {
                    isLoading(null)
                    setError(err.message)
                })

        }, 1000);


    },
        [apiKey, method, url])

    return { data, loading, error, status };
}
export default useFetch