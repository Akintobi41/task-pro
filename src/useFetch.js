import { useEffect, useState } from "react";

const useFetch = () => {

    const [data, setData] = useState([])
    const [loading, isLoading] = useState(true);

    const apiKey = import.meta.env.VITE_PRIVATE_KEY;
    // const gidKey = import.meta.env.VITE_GID_KEY;


    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                authorization:
                    `Bearer ${apiKey}`,
            },
            // body: JSON.stringify({ data: { name: "Bug Task" } }),
        };

        setTimeout(() => {
            try {
                fetch(
                    'https://app.asana.com/api/1.0/tasks?limit=50&project=1205465631047325&opt_fields=completed,created_at,due_on,followers,hearted,projects.name,modified_at,followers,name,notes',
                    options
                )
                    .then((res) => {
                        if (!res.ok) throw Error('No tasks available at the moment. Please try again later...')
                        return res.json()
                    })
                    .then((res) => {
                        isLoading(false)
                        setData(res.data)

                    })
            } catch (error) {
                // isLoading(true)
                console.log(error.message)
            }

        }, 1000);



    },
        [apiKey])

    return { data, loading }
}
export default useFetch