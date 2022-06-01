
import Image from 'next/image'
import { MovieWithReviews } from '../../types';

function MovieView({ movie, children }: {movie: MovieWithReviews, children:any}) { 
  return (
    <div className="card shadow-lg p-3 mb-5">
      <div className="row g-0">
        <div className="col-md-4">
          <div className="row g-0 mb-4">
            { movie.PosterUrl && <Image src={movie.PosterUrl || ""} alt="" width={400} height={400}></Image> }
          </div>
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h4 className="card-title">
              {movie.Title}
              <span className="badge bg-info fs-6 ms-2">({movie.Rating})</span>
            </h4>
            <h5 className="fs-5">
              Released
              <span className="fs-6 text-muted ms-2">{movie.Year}</span>
            </h5>
            <h5 className="fs-5">
              Cast <span className="text-muted ms-2">{movie.Cast}</span>
            </h5>            
            <p className="card-text">{movie.Plot}</p>
            <p>
              Runtime
              <span className="badge rounded-pill bg-primary">
                {movie.Duration}
              </span>
            </p>
          </div>
          {children}
        </div>
        
      </div>
     
    </div>
  );
}

export default MovieView;
