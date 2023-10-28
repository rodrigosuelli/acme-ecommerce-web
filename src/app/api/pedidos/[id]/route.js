import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;

  const query = request.nextUrl.search;

  const url = `${process.env.STRAPI_API_URL}/pedidos/${id}${query}`;

  const headersList = headers();

  // Extract token from header: 'Bearer jqklmaosdpakm' => 'jqklmaosdpakm'
  const authHeader = headersList.get('Authorization');
  const userJwtToken = authHeader && authHeader.split(' ')[1];

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userJwtToken}`,
    },
  });

  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
    statusText: res.statusText,
  });
}
