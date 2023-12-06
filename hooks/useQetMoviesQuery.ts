import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetMovie = (page: number, s: string) => {
    const fetchData = async () => {
        const data = await axios.get(
            `https://www.omdbapi.com/?i=tt3896198&apikey=21a719ad&s=${s}&page=${page}`
        );

        return data.data;
    };
    const movieData = useQuery({
        queryKey: ["movies-list", page, s],
        queryFn: fetchData,
    });

    return movieData;
};

export default useGetMovie