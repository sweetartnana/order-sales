import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization')

  if (basicAuth) {
    const base64Credentials = basicAuth.split(' ')[1]
    const credentials = atob(base64Credentials)
    const [user, pass] = credentials.split(':')

    if (user === 'admin' && pass === '12345') {
      return NextResponse.next()
    }
  }

  return new Response('Acesso restrito', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Área restrita"',
    },
  })
}

export const config = {
  matcher: ['/', '/(.*)'], // Aplica o middleware a toda a aplicação
}
