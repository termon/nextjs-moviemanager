import { useForm } from "react-hook-form";

export default function GenreOptions() {

  return (
    <>
      <option value="-1" disabled>Choose a Genre...</option>
      <option value="0">Action</option>
      <option value="1">Comedy</option>
      <option value="2">Family</option>
      <option value="3">Horror</option>
      <option value="4">Romance</option>
      <option value="5">SciFi</option>
      <option value="6">Thriller</option>
      <option value="7">Western</option>
      <option value="8">War</option>
    </>    
  )
}
