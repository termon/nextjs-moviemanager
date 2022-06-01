import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { Movie } from "@prisma/client";

import { MovieWithReviews } from "../../../types";
import { getMovie } from "@/lib/db-service";
import MovieForm from '@/components/Movie/MovieForm'
import { updateMovieApiRequest } from "@/lib/api-service";

function MovieEditPage({movie}: { movie: Movie}) {
    const router = useRouter()

    const onSubmit = async (data:Movie) => {  
        // convert genre to int       
        data = {...data, Genre: Number(data.Genre) }
        const resp = await updateMovieApiRequest(data)
        router.push(`/movie/${movie.Id}`)
    }

    const onCancel = async () =>  {
        router.push(`/movie/${movie.Id}`)
    }
 
    return ( 
        <>
         <MovieForm edit={true} movie={movie} onCancel={onCancel} onSubmit={onSubmit} />
        </> 
    )
}

// function executed on the server
export async function getServerSideProps(context: NextPageContext) {
    const {id} = context.query
    const movie = await getMovie(Number(id));
    // Pass movie to the page via props
    if (movie != null) {   
        return { props: { movie } };
    } else {
        return { notFound: true}
    }
 
}

export default MovieEditPage;