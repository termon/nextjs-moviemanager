import { MovieWithReviews, ReviewNoId } from "../../../types";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

import { getMovieWithReviews } from "@/lib/db-service";
import { createReviewApiRequest, 
         deleteMovieApiRequest, 
         deleteReviewApiRequest } from "@/lib/api-service";

import MovieView from "@/components/Movie/MovieView";
import ReviewsList from "@/components/Movie/ReviewsList";
import ReviewForm from "@/components/Movie/ReviewForm";
import { Review } from ".prisma/client";
import { useState } from "react";

function MovieViewPage({movie}: { movie: MovieWithReviews}) {
    const [addReviewMode, setAddReviewMode] = useState(false);

    const router = useRouter();

    const review: ReviewNoId = { 
        MovieId: movie.Id, 
        On: new Date().toISOString().split('T')[0], 
        Comment: "", 
        Rating: 0  
    }

    const createReviewHandler = async (review:Review) => {
        const resp = await createReviewApiRequest(review)
        console.log('added review', resp)
        router.push(`/movie/${movie.Id}`)
        setAddReviewMode(false)
    }

    const deleteReviewHandler = async (id:number) => {       
        const resp = await deleteReviewApiRequest(id)
        console.log('deleted review', resp)
        router.push(`/movie/${movie.Id}`)
    }

    const deleteHandler = async (id:number) => {
        const resp = await deleteMovieApiRequest(id)
        console.log('deleted movie', resp)
        router.push("/movie")
    }

    if (movie === null) {
        return <h3>Not found</h3>
    }

    return (
        <>
            <MovieView movie={movie}> 

                { addReviewMode && 
                    <ReviewForm review={review} onSubmit={createReviewHandler} onCancel={() => setAddReviewMode(false)} /> 
                }
                
                { !addReviewMode && 
                    <div>
                        <ReviewsList reviews={movie.Reviews} onDelete={deleteReviewHandler} /> 
                        <div className="d-flex">
                            <button className="btn btn-link" onClick={() => router.push(`/movie`) }>List <i className="bi bi-justify"></i></button>
                            <button className="btn btn-link" onClick={() => deleteHandler(movie.Id) }>Delete <i className="bi bi-trash"></i></button>
                            <button className="btn btn-link" onClick={() => router.push(`/movie/${movie.Id}/edit`) }>Edit <i className="bi bi-pen"></i></button>
                            <button className="btn btn-link" onClick={() => setAddReviewMode(!addReviewMode) }>Review <i className="bi bi-chat-dots"></i></button>
                        </div> 
                    </div>
                }

            </MovieView>              
        </> 
    );
}

// function executed on the server
export async function getServerSideProps(context: NextPageContext) {
  const {id} = context.query
  const {res} = context
  const movie = await getMovieWithReviews(Number(id));

  // Pass movie to the page via props
  if (movie != null) {
    return { props: { movie } };        
  } else {
    return { notFound: true }
    // return a 404 or redirect
    // return { redirect: { destination: '/', permanent: false } }
  }
}

export default MovieViewPage;
