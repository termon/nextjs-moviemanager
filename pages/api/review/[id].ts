
import { Review } from '.prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getReview, deleteReview } from '@/lib/db-service'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Review|null>) {
  if (req.method == 'DELETE') {
    await deleteHandler(req,res)
  } else if (req.method === 'GET') {
    await getHandler(req,res)
  }
}

// ---------------- private handler functions ---------------------------
const deleteHandler = async (req: NextApiRequest, res: NextApiResponse<Review|null>) => {
  const {id} = req.query
  const review = await deleteReview(Number(id))
  if (review != null) {
    res.status(200).json( review )
  } else {
    res.status(404).end(`404: Review ${id} not found`)
  }
}

// strictly not required as get requests are handled in page getServerSideProps function
const getHandler = async (req: NextApiRequest, res: NextApiResponse<Review|null>) => {
  const {id} = req.query
  const review = await getReview(Number(id))
  if (review != null) {
    res.status(200).json( review )
 } else {
   res.status(404).end(`404: Review ${id} not found`)
 }
}
