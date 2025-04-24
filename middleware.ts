export default function middleware(req: Request) {
  const basicAuth = req.headers.get('authorization');

  // Verifica se há um cabeçalho de autorização
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]; // Extraí o valor do cabeçalho Authorization
    const [user, pass] = atob(authValue).split(':'); // Decodifica o valor Base64 e divide em usuário e senha

    // Verifica se o usuário e a senha são válidos
    if (user === 'admin' && pass === '12345') {
      return new Response(null, { status: 200 }); // Acesso permitido
    }
  }

  // Se a autenticação falhar, retorna um erro 401 (não autorizado)
  return new Response('Acesso restrito', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Área restrita"',
    },
  });
}

export const config = {
  matcher: '/', // Alvo para proteger a página inicial. Pode usar '/(.*)' para proteger tudo
};
