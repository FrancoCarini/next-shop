import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!session) {
    const requestedPage = req.page.name
    return NextResponse.redirect(`/auth/login?p=${requestedPage}`)
  }

  return NextResponse.next()
}
