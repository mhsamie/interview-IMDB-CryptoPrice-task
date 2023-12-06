import MoviePage from "@/components/movies-components/MoviePage";

const page = ({ params }: { params: { id: string } }) => {
  return <MoviePage name={params?.id} />;
};

export default page;
