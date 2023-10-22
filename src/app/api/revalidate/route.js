import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

// Revalidate webhook to `your-website.com/api/revalidate
export async function POST(request) {
  const headersList = headers();

  // Extract secret from header: 'Bearer jqklmaosdpakm' => 'jqklmaosdpakm'
  const authHeader = headersList.get('Authorization');
  const secret = authHeader && authHeader.split(' ')[1];

  const data = await request.json();

  const { event, model, entry } = data;

  // eslint-disable-next-line no-console
  console.log({ event, model, entry });

  if (model !== 'produto') {
    return Response.json(
      { message: 'Model is not `produto`' },
      { status: 400 }
    );
  }

  if (secret !== process.env.NEXT_REVALIDATION_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag('product');

  return Response.json({ revalidated: true, now: Date.now() });
}
