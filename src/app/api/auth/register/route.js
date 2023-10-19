import { NextResponse } from 'next/server';

export async function POST(request) {
  const url = `${process.env.STRAPI_API_URL}/auth/local/register`;

  /** @type {{nome: string}} */
  const { nome, email, password, celular, data_nasc } = await request.json();

  const username = email.split('@')[0];

  // Converter data para formato ISO
  const data_nascArray = data_nasc.split('/');
  const day = data_nascArray[0];
  const month = data_nascArray[1];
  const year = data_nascArray[2];

  const data_nascISO = `${year}-${month}-${day}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      username,
      nome,
      email,
      password,
      celular,
      data_nasc: data_nascISO,
    }),
  });

  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
    statusText: res.statusText,
  });
}
