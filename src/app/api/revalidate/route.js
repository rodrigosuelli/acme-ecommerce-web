import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function POST(request) {
  const headersList = headers();

  // Extract secret from header: 'Bearer jqklmaosdpakm' => 'jqklmaosdpakm'
  const authHeader = headersList.get('Authorization');
  const secret = authHeader && authHeader.split(' ')[1];

  const event = headersList.get('X-Strapi-Event');

  console.log(event);
  console.log(await request.json());

  // const tag = request.nextUrl.searchParams.get('tag');

  if (secret !== process.env.NEXT_REVALIDATION_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // if (!tag) {
  //   return Response.json({ message: 'Missing tag param' }, { status: 400 });
  // }

  // revalidateTag(tag);

  return Response.json({ revalidated: true, now: Date.now() });
}

// import { revalidatePath } from 'next/cache'

// export async function POST(request) {
//   const path = request.nextUrl.searchParams.get('path')

//   if (!path) {
//     return Response.json({ message: 'Missing path param' }, { status: 400 })
//   }

//   revalidatePath(path)

//   return Response.json({ revalidated: true, now: Date.now() })
// }
