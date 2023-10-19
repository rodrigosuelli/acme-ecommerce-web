import { NextResponse } from 'next/server';

export async function POST(request) {
  const url = `${process.env.STRAPI_API_URL}/auth/local/register`;

  const { username, email, password, celular, data_nasc } =
    await request.json();

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      username,
      email,
      password,
      celular,
      data_nasc,
    }),
  });

  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
    statusText: res.statusText,
  });
}
