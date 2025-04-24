export default function middleware(req: Request) {
  try {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pass] = atob(authValue).split(':');

      if (user === 'admin' && pass === '12345') {
        return new Response(null, { status: 200 }); // Permite a requisição
      }
    }

    // Se a autenticação falhar, retorna 401
    return new Response('Acesso restrito', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Área restrita"',
      },
    });
  } catch (error) {
    console.error('Erro no middleware:', error);
    // Retorna erro 500 se algo falhar
    return new Response('Erro interno no servidor', { status: 500 });
  }
}

export const config = {
  matcher: '/', // Ou '/(.*)' para proteger tudo
};
