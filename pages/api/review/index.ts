
import { Review } from '.prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { addReview } from '@/lib/db-service'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Review|null>) { 
  if (req.method === 'POST') {
    const data = req.body
    const {id} = req.query

    const review = await addReview(data)
    if (review != null) {
      console.log('review added', review.Id)    
      res.status(201).json( review )
    } else {
      res.status(500).end(`Review could not be created`)
    }
  }
  
}

