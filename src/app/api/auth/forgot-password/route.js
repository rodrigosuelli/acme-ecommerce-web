export async function POST(request) {
  const url = `${process.env.STRAPI_API_URL}/auth/forgot-password`;

  const { email } = await request.json();

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      email,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
