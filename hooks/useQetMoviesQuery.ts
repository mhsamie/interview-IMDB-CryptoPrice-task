import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetMovie = (page: number, s: string) => {
    const apiKey = process.env.NEXT_PUBLIC_IMBD_API_KEY
    const fetchData = async () => {
        const data = await axios.get(
            `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${s}&page=${page}`
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