import { connect, disconnect } from '@/database/db'
import User from '@/models/User'

import { signToken } from '@/utils/jwt'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name } = req.body

    await connect()
    const user = await User.create({
      email,
      password,
      name,
      role: 'client',
    })
    await disconnect()

    const { _id, role } = user

    const token = signToken(_id, email)

    return res.json({
      token,
      user: {
        email,
        role,
        name,
      },
    })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
