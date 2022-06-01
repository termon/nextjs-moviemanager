import { Movie } from ".prisma/client";
import { useRouter } from "next/router";


function MovieList({ movies }: { movies:Movie[] }) {
  const router = useRouter();

  return (
    <>
      <h3>Movie List</h3>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Year</th>
            <th>Director</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { movies.map((m:Movie) => (
            <tr key={m.Id}>
                <td>{m.Id}</td>
                <td>{m.Title}</td>
                <td>{m.Year}</td>
                <td>{m.Director}</td>
                <td>
                  <button className="btn btn-link" onClick={() => router.push(`/movie/${m.Id}`) }><i className="bi bi-justify"></i></button>            
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default MovieList;
