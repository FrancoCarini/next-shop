import { connect, disconnect } from '@/database/db'
import Order from '@/models/Order'
import Product from '@/models/Product'
import User from '@/models/User'

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await connect()

      const stats = await Promise.all([
        Order.count(),
        Order.find({ isPaid: true }).count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        Product.find({
          inStock: { $lte: 10 },
        }).count(),
      ])

      await disconnect()
      res.status(200).json({
        numberOfProducts: stats[3],
        productsNoStock: stats[4],
        productsLowStock: stats[5],
        numberOfOrders: stats[0],
        paidOrders: stats[1],
        notPaidOrders: stats[0] - stats[1],
        numberOfClients: stats[2],
      })
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
