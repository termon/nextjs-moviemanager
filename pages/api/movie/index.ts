// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Movie } from '.prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { addMovie, getMovies } from '../../../lib/db-service'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Movie[]|Movie|null>) {
  if (req.method === 'POST') {
    const data = req.body
    const movie = await addMovie(data)
    if (movie != null) {
      console.log('movie added', movie.Id)    
      res.status(201).json( movie )
    } else {
      res.status(500).end(`Movie could not be created`)
    }
  } else if (req.method === 'GET') {
    const movies = await getMovies()
    res.status(200).json( movies )
  }
  
}

