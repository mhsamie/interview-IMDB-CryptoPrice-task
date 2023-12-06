import Movies from "@/components/movies-components/Movies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fatemeh samie | IMDB",
  description: "This is a enterview task",
};
const page = () => {
  return <Movies />;
};

export default page;
