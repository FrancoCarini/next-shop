import { connect, disconnect } from '@/database/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

import { signToken } from '@/utils/jwt'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    await connect()
    const user = await User.findOne({ email })
    await disconnect()

    if (!user) {
      return res.status(400).json({ message: 'User Or Password not valid' })
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'User Or Password not valid' })
    }

    const { role, name, _id } = user

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
