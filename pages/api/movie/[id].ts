// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Movie } from '.prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteMovie, getMovie, updateMovie } from '@/lib/db-service'

// ---------------- API request handler function -----------------------
export default async function handler(req: NextApiRequest, res: NextApiResponse<Movie|null>) {
  if (req.method === 'DELETE') {
    await deleteHandler(req,res)
  } else if (req.method === 'PUT') {
    await putHandler(req,res)
  } else if (req.method === 'GET') {
    await getHandler(req,res)
  }
}


// ---------------- private handler functions ---------------------------
const deleteHandler = async (req: NextApiRequest, res: NextApiResponse<Movie|null>) => {
  const {id} = req.query
  const movie = await deleteMovie(Number(id))
  console.log('movie delete', id)
  res.status(200).json( movie )
}

const putHandler = async (req: NextApiRequest, res: NextApiResponse<Movie|null>) => {
  const {id} = req.query
  const data = req.body
  // check route query id matches movie Id
  if (id != data.Id ) {
    console.log('movie update: invalid query param', id)
    return res.status(404).end()
  }
  // update movie and return 200 resp
  const movie = await updateMovie(data)
  console.log('movie put', movie?.Id)
  
  res.status(200).json( movie )
}

// strictly not required as get requests are handled in page getServerSideProps function
const getHandler = async (req: NextApiRequest, res: NextApiResponse<Movie|null>) => {
  const {id} = req.query
  const movie = await getMovie(Number(id))
  if (movie != null) {
    console.log('movie get', movie?.Id)
    res.status(200).json( movie )  
  } else {
    console.log('movie get 404')
    return res.status(404).end(`404: Movie ${id} not found`)
  }
}