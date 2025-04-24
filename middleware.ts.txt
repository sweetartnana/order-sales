import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pass] = atob(authValue).split(':')

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
  matcher: '/', // ou '/(.*)' se quiser proteger tudo
}
