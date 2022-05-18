import { connect, disconnect } from '@/database/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

import { signToken } from '@/utils/jwt'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name } = req.body

    await connect()
    const user = await User.create({
      email,
      password,
      name,
    })
    await disconnect()

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
