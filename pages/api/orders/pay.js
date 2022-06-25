import { getSession } from 'next-auth/react'

import { connect, disconnect } from '@/database/db'
import Order from '@/models/Order'
import axios from 'axios'

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      const paypalToken = await getPaypalBearerToken()

      if (!paypalToken) {
        return res
          .status(400)
          .json({ message: 'Impossible to generate paypal token' })
      }

      const { transactionId, orderId } = req.body

      const { data } = await axios.get(
        `${procese.env.PAYPAL_ORDERS_URL}/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${paypalToken}`,
          },
        }
      )

      if (data.status !== 'COMPLETED') {
        return res.status(401).json({ message: 'Order not recognized' })
      }

      await connect()

      const dbOrder = await Order.findById(orderId)

      if (!dbOrder) {
        await disconnect()
        return res.status(400).json({ message: 'Order does not exist in db' })
      }

      if (dbOrder.total !== data.purchase_units[0].amount.value) {
        await disconnect()
        return res
          .status(400)
          .json({ message: 'Paypal and db amounts are not equal' })
      }

      dbOrder.transactionId = transactionId
      dbOrder.isPaid = true
      await dbOrder.save()
      await disconnect()

      return res.status(200).json({ message: 'Order payed!' })
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}

const getPaypalBearerToken = async () => {
  const base64Token = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  )

  try {
    const { data } = axios.post(
      process.env.PAYPAL_OAUTH_URL,
      new URLSearchParams('grant_type=client_credentials'),
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    return data.access_token
  } catch (error) {
    if (axios.isAxiosError) {
      console.log(error.response.data)
    } else {
      console.log(error)
    }
    return null
  }
}
