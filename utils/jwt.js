import jwt from 'jsonwebtoken'

export const signToken = (_id, email) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('Theres no JWT Secret defined in conf')
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
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) return reject('JWT is not valid')
        const { _id } = payload
        resolve(_id)
      })
    } catch (error) {
      reject('JWT is not valid')
    }
  })
}
