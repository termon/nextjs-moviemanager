
import { getMovies } from "../../lib/db-service";
import { useRouter } from "next/router";
import MovieList from "../../components/Movie/MovieList";
import { Movie } from ".prisma/client";

function Movies({ movies } : {movies:Movie[]} ) {
  const router = useRouter();

  return (
    <>
      <button
        className="btn btn-primary my-4"
        onClick={() => router.push("/movie/create")}>
        Add Movie
      </button>
      <MovieList movies={movies} />
    </>
  );
}

// function executed on the server
export async function getServerSideProps() {
  const movies = await getMovies();

  // Pass movies to the page via props
  return { props: { movies } };
}

export default Movies;
