import { connect, disconnect } from '@/database/db'
import Product from '@/models/Product'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let { q = '' } = req.query

    if (q.length === 0) {
      return res.status(400).json({
        message: 'You must especify a query',
      })
    }

    q = q.toString().toLowerCase()

    await connect()
    const products = await Product.find({
      $text: { $search: q },
    })
      .select('title images price inStock slug -_id')
      .lean()

    await disconnect()

    return res.status(200).json(products)
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
