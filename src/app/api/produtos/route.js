import { NextResponse } from 'next/server';

export async function GET(request) {
  const query = request.nextUrl.search;

  const url = `${process.env.STRAPI_API_URL}/produtos?${query}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  });

  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
    statusText: res.statusText,
  });
}
