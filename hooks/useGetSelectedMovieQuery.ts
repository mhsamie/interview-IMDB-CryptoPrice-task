import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetSelectedMovie = (id: string) => {
    const apiKey = process.env.NEXT_PUBLIC_IMBD_API_KEY
    const fetchData = async () => {
        const data = await axios.get(
            `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&t=${id}&plot=full`
        );
        return data.data;
    };
    const eachMoviedata = useQuery({
        queryKey: ["movie-detail"],
        queryFn: fetchData,
    });
    return eachMoviedata;
};
export default useGetSelectedMovie