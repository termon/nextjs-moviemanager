import { PrismaClient } from '@prisma/client'
import { Movie, Review, User } from ".prisma/client";
import { MovieWithReviews } from '../types';


// -------------------------- Movie Management --------------------------
export const getMovies = async () : Promise<Movie[]> => {
    const prisma = new PrismaClient()
    const data = await prisma.movie.findMany() 
    console.log("db.GetMovies:", data)        
    await prisma.$disconnect()

    return data
}

export const getMovie = async (id:number): Promise<Movie|null> => {
    const prisma = new PrismaClient()
    try {
        const data = await prisma.movie.findUnique( {
            where: { Id: id }
        }) 
        console.log("db.GetMovie:", data)        
        return data
    } catch (e) {
        console.error("db.GetMovie Error:", e)       
    } finally {
        await prisma.$disconnect()        
    }
    return null;   
}

export const getMovieWithReviews = async (id:number): Promise<MovieWithReviews|null> => {
    const prisma = new PrismaClient()
    try {
        const data = await prisma.movie.findUnique( {
            where: { Id: id },
            include: { Reviews: true }
        }) 
        console.log("db.GetMovieWithReviews:", data)        
        return data
    } catch (e) {
        console.error("db.GetMovieWithReviews Error:", e)        
    } finally {
        await prisma.$disconnect()
    }
    return null
}

export const deleteMovie = async (id:number): Promise<Movie|null> => {
    const prisma = new PrismaClient()
    try {
        const deleted = await prisma.movie.delete( { 
            where: { Id: id }
        })
        console.log("db.DeleteMovie:", deleted)    
        return deleted 
    } catch (e) {
        console.error("db.DeleteMovie Error:", e)        
    } finally {
        await prisma.$disconnect()
    }
    return null
}

export const addMovie = async (data:Movie): Promise<Movie|null> => {
    const prisma = new PrismaClient()
    try {
        const movie = await prisma.movie.create( {
            data: data
        })   
        console.log("db.CreateMovie:", data)         
        return movie;
    } catch (e) {
        console.error("db.AddMovie Error:", e)
    } finally {
        await prisma.$disconnect()
    }
    return null
}

export const updateMovie = async (data:Movie): Promise<Movie|null> => {
    const prisma = new PrismaClient()
    try {
        const movie = await prisma.movie.update({
            where: { Id: data.Id },
            data: data,
        })
        console.log("db.UpdateMovie:", movie)    
        return movie
    } catch (e) {
        console.error("db.UpdateMovie Error:", e)       
    } finally {
        await prisma.$disconnect()
    }
    return null
}

// -------------------------- Review Management --------------------------

// private method to update Movie rating following review list modification
const updateMovieRating = async (movie: MovieWithReviews): Promise<MovieWithReviews> => {
    const prisma = new PrismaClient()
    try {
        await prisma.movie.update( {
            where: { Id: movie.Id },
            data: {
                Rating: movie.Reviews.length > 0 ? movie.Reviews.reduce( (t:number,r:Movie) => t + r.Rating, 0) / movie.Reviews.length : 0
            }
        })
    } catch (e) {
        console.error("db.UpdateMovieRating Error:", e)
    } finally {
        await prisma.$disconnect()
        console.log("db.UpdateMovieRating", movie)
    }
    return movie;
}

export const addReview = async (data:Review): Promise<Review|null> => {
    const prisma = new PrismaClient()
    try {

        const review = await prisma.review.create( {
            data: data
        })
        console.log('db.AddReview', data)

        // update movie rating
        const movie = await getMovieWithReviews(data.MovieId);
        updateMovieRating(movie)

        return review;
    } catch (e) {
        console.error("db.AddReview Error:", e)
    } finally {
        await prisma.$disconnect()
    }
    return null
}

export const getReview = async (id:number): Promise<Review|null> => {
    const prisma = new PrismaClient()
    try {
        const data = await prisma.review.findUnique( {
            where: { Id: id }
        }) 
        return data
    } catch (e) {
        console.error("db.GetReview Error:", e)
    } finally {
        await prisma.$disconnect()
    }
    return null
}

export const deleteReview = async (id:number): Promise<Review|null> => {
    const prisma = new PrismaClient()
    try {
        const deleted = await prisma.review.delete( { 
            where: { Id: id }
        })
        
        // update movie rating
        const movie = await getMovieWithReviews(deleted.MovieId);
        updateMovieRating(movie)

        console.log("db.DeleteReview: ", deleted)
        return deleted 
    } catch (e) {
        console.error("db.DeleteReview Error:", e)        
    } finally {
        await prisma.$disconnect()
    }
    return null
}

// -------------------------- User Management --------------------------
export const getUsers = async (): Promise<User[]> => {
    const prisma = new PrismaClient()
    const users = await prisma.user.findMany()

    await prisma.$disconnect()
    return users;
}

