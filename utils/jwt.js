import { promisify } from 'util'
import jwt from 'jsonwebtoken'

export const signToken = (_id, email) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('Theres no JWT Secret defined')
  }

  return jwt.sign(
    {
      _id,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  )
}

export const isValidToken = async (token) => {
  return await promisify(jwt.verify)(token, process.env.JWT_SECRET)
}
