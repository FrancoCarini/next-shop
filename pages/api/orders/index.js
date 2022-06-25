import { getSession } from 'next-auth/react'

import { connect, disconnect } from '@/database/db'
import Order from '@/models/Order'
import Product from '@/models/Product'

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      const { items, total } = req.body
      // Verify user session
      const session = await getSession({ req })
      if (!session) {
        return res.status(401).json({ message: 'You must be authenticated' })
      }

      // Create array with products ids
      const productsIds = items.map((product) => product._id)
      await connect()

      // Find these products in DB according to ids array
      const dbProducts = await Product.find({ _id: { $in: productsIds } })

      try {
        // Calculate items price but grabbing price from db and compare with front end price
        const subTotal = items.reduce((prev, current) => {
          const currentPrice = dbProducts.find(
            (prod) => prod._id.toString() === current._id
          )

          if (!currentPrice) {
            throw new Error(
              'Please verify the cart. Theres some product that does not exists'
            )
          }

          return currentPrice.price * current.quantity + prev
        }, 0)

        const taxRate = process.env.NEXT_PUBLIC_TAX_RATE || 0
        const backendTotal = subTotal * (taxRate + 1)

        // if (total !== backendTotal) {
        //   throw new Error('Order total are differents')
        // }

        const userId = session.user._id
        const newOrder = new Order({
          ...req.body,
          isPaid: false,
          user: userId,
          total: Math.round(total * 100) / 100,
        })
        await newOrder.save()
        await disconnect()
        return res.status(200).json(newOrder)
      } catch (error) {
        await disconnect()
        return res.status(400).json({ message: error.message })
      }
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
