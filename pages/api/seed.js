import { connect, disconnect } from '@/database/db'
import { initialData } from '@/database/seeder'
import Product from '@/models/Product'
import User from '@/models/User'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (process.env.NODE_ENV === 'production') {
      return res
        .status(401)
        .json({ message: 'No tiene acceso a este servicio' })
    }

    await connect()

    await Product.deleteMany()
    await Product.insertMany(initialData.products)

    await User.deleteMany()
    await User.insertMany(initialData.users)

    await disconnect()
    res.status(200).json({ message: 'Data Inserted' })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
