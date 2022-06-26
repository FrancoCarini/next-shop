import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const validRole = ['admin']

  if (!session || !validRole.includes(session.user.role)) {
    return new Response(JSON.stringify({ message: 'Not authorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return NextResponse.next()
}
