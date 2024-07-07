import fs from 'fs/promises';
import path from 'path';

export async function GET(req: Request) {
  const user = req.url.split('/').pop()
  
  if (user && user.length) {
    const publicDir = path.join(process.cwd(), 'assets');
    const fileUrl = user;
    const filePath = path.join(publicDir, fileUrl);

    try {
      const data = await fs.readFile(filePath);
      return new Response(data, { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error }), { status: 400 });
    }
  } else {
    return new Response(JSON.stringify({ error: "No user" }), { status: 400 });
  }
}