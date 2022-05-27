import bcrypt from 'bcryptjs'

import { connect, disconnect } from './db'
import User from '@/models/User'

export const checkUserEmailPassword = async (email, password) => {
  await connect()
  const user = await User.findOne({ email })
  await disconnect()

  if (!user) return null

  if (!bcrypt.compareSync(password, user.password)) {
    return null
  }

  const { _id, name, role } = user

  return {
    _id,
    email,
    role,
    name,
  }
}

export const oauthToDbUser = async (oauthEmail, oauthName) => {
  await connect()
  const user = await User.findOne({ email: oauthEmail })

  if (user) {
    await disconnect()
    const { _id, name, email, role } = user
    return { _id, name, email, role }
  }

  const newUser = await User.create({
    email: oauthEmail,
    name: oauthName,
    password: '@',
    role: 'client',
  })
  await disconnect()
  const { _id, name, email, role } = newUser
  return { _id, name, email, role }
}
