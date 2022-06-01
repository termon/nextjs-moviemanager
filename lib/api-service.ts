import { Movie, Review } from "@prisma/client"

// API Request functions called in client side pages

export async function createMovieApiRequest(movie: Movie) : Promise<Response> {
    return fetch('/api/movie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    })
}

export async function deleteMovieApiRequest(id: number) {
    return await fetch(`/api/movie/${id}`, {
        method: 'DELETE'
    })
} 

export function updateMovieApiRequest(movie: Movie) : Promise<Response> {
    return fetch(`/api/movie/${movie.Id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    })
}

export function createReviewApiRequest(review: Review) : Promise<Response> {
    return fetch(`/api/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    })
}

export async function deleteReviewApiRequest(id: number) : Promise<Response> {
    console.log(`deleting review ${id}`)
    return await fetch(`/api/review/${id}`, {
        method: 'DELETE'
    })
} 
