
import { Movie } from '.prisma/client'
import { useRouter } from 'next/router'
import MovieForm from '../../components/Movie/MovieForm'
import { createMovieApiRequest } from '../../lib/api-service'
import { MovieNoId } from '../../types'

function CreateMovie() {
    const router = useRouter()

    const onSubmit = async (data:Movie) => {  
        // convert genre to int       
        data = {...data, Genre: Number(data.Genre) }
        const movie = await createMovieApiRequest(data)
        router.push("/movie")
    }

    const onCancel = async () =>  {
        router.push("/movie")
    }
 
    const blank:MovieNoId = { 
        Title:  "",
        Director: "",
        Year: 0,
        Duration: 0,
        Budget: 0,
        Rating: 0,
        PosterUrl: "",
        Genre: -1,
        Cast: "",
        Plot: ""
    }

    return (      
        <>
         <MovieForm movie={blank} onCancel={onCancel} onSubmit={onSubmit} />
        </> 
    )
}

// function executed on the server
export async function getServerSideProps() {
    return {
        props: {}
    }
}

export default CreateMovie;
