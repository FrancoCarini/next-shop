import { connect, disconnect } from '@/database/db'
import Product from '@/models/Product'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await connect()
    const { slug } = req.query
    const product = await Product.findOne({ slug }).lean()
    await disconnect()

    if (!product) {
      return res.status(404).json({
        message: `No product with slug ${slug}`,
      })
    }

    product.images = product.images.map((image) => {
      return image.includes('http')
        ? image
        : `${process.env.HOST_NAME}products/${image}`
    })

    return res.json(product)
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
