import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetSelectedMovie = (id: string) => {
    const fetchData = async () => {
        const data = await axios.get(
            `http://www.omdbapi.com/?i=tt3896198&apikey=21a719ad&t=${id}&plot=full`
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