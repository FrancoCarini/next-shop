import { connect, disconnect } from '@/database/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

import { signToken, isValidToken } from '@/utils/jwt'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { token = '' } = req.cookies

    let decodedToken = ''

    try {
      decodedToken = await isValidToken(token)
    } catch (error) {
      return res.status(401).json({
        message: 'Auth Token is not valid',
      })
    }

    await connect()
    const user = await User.findById(decodedToken._id).lean()
    await disconnect()

    if (!user) {
      return res.status(400).json({ message: 'User does not exists' })
    }

    const { _id, email, role, name } = user

    return res.json({
      token: signToken(_id, email),
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
