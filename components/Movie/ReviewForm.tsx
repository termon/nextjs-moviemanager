import { useForm } from "react-hook-form";
import {  ReviewNoId } from "../../types";
import { Review } from ".prisma/client";

// temporary import workaround until hookform fixed
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from "yup";

class ReviewFormProps {
  edit?: boolean = false
  review: Review | ReviewNoId
  onSubmit: any
  onCancel: any
}

export default function ReviewForm({edit, review, onSubmit,onCancel} : ReviewFormProps) {

  const schema = yup.object({
    Name: yup.string().required(),
    Comment: yup.string().required().min(1).max(300),
    MovieId: yup.number().required(),
    Rating: yup.number().min(1).max(10)
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm<Review>(
    {
      defaultValues: review ,
      resolver: yupResolver(schema)       
    }
  );

  return (
    <div className="card mt-4 p-3">
      <h3 className="ms-3">{edit ? "Edit" : "Create" } Review</h3>

      <form className="m-3" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="mb-2">
          <label htmlFor="Name" className="form-label">Name</label>
          <input className="form-control"  {...register("Name")} />
          <div className="text-danger">{errors.Name?.message}</div>
        </div>

        <div className="mb-3">
            <label htmlFor="Comment" className="form-label">Comment</label>
            <textarea className="form-control" rows={2} {...register("Comment")}></textarea>
           <div className="text-danger"> {errors.Comment?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="Rating" className="form-label">Rating</label>
          <input className="form-control" {...register("Rating")}/>
          <div className="text-danger">{errors.Rating?.message}</div>
        </div>        
      
        <button className="btn btn-primary" type="submit">{edit ? "Save" : "Create"}</button>
        <button className="btn btn-link" onClick={onCancel}>Cancel</button>
        
      </form>
    </div>
  );
}
