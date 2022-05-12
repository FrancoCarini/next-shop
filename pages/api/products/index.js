import { connect, disconnect } from '@/database/db'
import Product from '@/models/Product'

import { SHOP_CONSTANTS } from '@/database/constants'

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res)
    case 'POST':
      return createProduct(req, res)
    default:
      res.setHeader('Allow', ['POST', 'GET'])
      res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}

const getProducts = async (req, res) => {
  const { gender = 'all' } = req.query

  let condition = {}

  if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(gender)) {
    condition = { gender }
  }

  await connect()
  const products = await Product.find(condition).select(
    'title images price inStock slug -_id'
  )
  await disconnect()
  res.status(200).json(products)
}
