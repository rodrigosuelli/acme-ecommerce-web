export async function POST(request) {
  const url = `${process.env.STRAPI_API_URL}/auth/local`;

  const { email, password } = await request.json();

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      identifier: email,
      password,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
