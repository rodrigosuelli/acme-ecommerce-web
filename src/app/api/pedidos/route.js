import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const url = `${process.env.STRAPI_API_URL}/pedidos`;

  const { user, valor_frete, produtos } = await request.json();

  const headersList = headers();

  // Extract token from header: 'Bearer jqklmaosdpakm' => 'jqklmaosdpakm'
  const authHeader = headersList.get('Authorization');
  const userJwtToken = authHeader && authHeader.split(' ')[1];

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userJwtToken}`,
    },
    body: JSON.stringify({
      data: {
        user,
        valor_frete,
        produtos,
      },
    }),
  });

  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
    statusText: res.statusText,
  });
}
