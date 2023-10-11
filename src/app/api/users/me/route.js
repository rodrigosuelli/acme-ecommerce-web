import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(_request) {
  const url = `${process.env.STRAPI_API_URL}/users/me`;

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
