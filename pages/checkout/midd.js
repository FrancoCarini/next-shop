import { isValidToken } from '@/utils/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const { token = '' } = req.cookies

  try {
    await isValidToken(token)
    return NextResponse.next()
  } catch (error) {
    const url = req.nextUrl.clone()
    const requestedPage = req.page.name
    return NextResponse.redirect(`${url.origin}/auth/login?p=${requestedPage}`)
  }
}
