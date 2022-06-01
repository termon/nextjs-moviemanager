import { useForm } from "react-hook-form";
import { Genre, MovieNoId } from "../../types";
import GenreOptions from "./GenreOptions";
// temporary import workaround until hookform fixed
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from "yup";
import { Movie } from ".prisma/client";

class MovieFormProps {
  edit?: boolean = false
  movie: Movie | MovieNoId
  onSubmit: any
  onCancel: any
}

export default function MovieForm({edit, movie, onSubmit,onCancel} : MovieFormProps) {

  const schema = yup.object({
    Title: yup.string().required(),
    Year: yup.number().integer().required().min(1900).max(new Date().getFullYear()+1),
    Duration: yup.number().integer().required().min(1).max(300),
    Budget: yup.number().min(0).max(500).required(),
    Director: yup.string().required().max(100),
    Genre: yup.string().required(),
    Cast: yup.string().max(200),
    Plot: yup.string().max(500),
    PosterUrl: yup.string().url().test(`verify-url-type`, 'Url resource does not exist', function (value) {     
      return fetch(value || '')
        .then( resp => resp.status == 200)
        .catch( e => false)
    })
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm<Movie>(
    {
      defaultValues: movie == null ? {} : movie,
      resolver: yupResolver(schema)       
    }
  );

  return (
    <div className="card mt-4 p-3">
      <h3 className="ms-3">{edit ? "Edit" : "Create" } Movie</h3>

      <form className="m-3" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="mb-2">
          <label htmlFor="Title" className="form-label">Title</label>
          <input className="form-control"  {...register("Title")} />
          <div className="text-danger">{errors.Title?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="Director" className="form-label">Director</label>
          <input className="form-control" {...register("Director")}/>
          <div className="text-danger">{errors.Director?.message}</div>
        </div>

        <div className="row">
            <div className="col-3">
              <label htmlFor="Year" className="form-label">Year</label>
              <input type="number" className="form-control" {...register("Year")}/>
              <div className="text-danger">{errors.Year?.message}</div>
            </div>

            <div className="col-3">
              <label htmlFor="Budget" className="form-label">Budget (£m)</label>
              <input type="number" className="form-control" {...register("Budget")}/>
              <div className="text-danger">{errors.Budget?.message}</div>
            </div>

            <div className="col-3">
              <label htmlFor="Duration" className="form-label">Duration</label>
              <input type="number" className="form-control" {...register("Duration")}/>
              <div className="text-danger">{errors.Duration?.message}</div>
            </div>
            
            <div className="col-3">
              <label htmlFor="Genre" className="form-label">Genre</label>
              <select defaultValue="" className="form-control" {...register("Genre", {valueAsNumber:true})}>
                 <GenreOptions />
              </select>
              <div className="text-danger">{errors.Genre?.message}</div>             
            </div>
        </div>

        <div className="mb-3">
            <label htmlFor="Cast" className="form-label">Cast</label>
            <textarea className="form-control" rows={2} {...register("Cast")}></textarea>
           <div className="text-danger"> {errors.Cast?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="PosterUrl" className="form-label">Poster Url</label>
            <input type="url" className="form-control"  {...register("PosterUrl")} />
           <div className="text-danger">{errors.PosterUrl?.message}</div>
      </div>

        <div className="mb-3">
            <label htmlFor="Plot" className="form-label">Plot</label>
            <textarea className="form-control" rows={5} {...register("Plot")}></textarea>
            <div className="text-danger">{errors.Plot?.message}</div>
        </div>
      
        <button className="btn btn-primary" type="submit">{edit ? "Save" : "Create"}</button>
        <button className="btn btn-link" onClick={onCancel}>Cancel</button>
        
      </form>
    </div>
  );
}
