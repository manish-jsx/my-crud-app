import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: session.user.email } }
      }
    });
    res.status(201).json(post);
  } else if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      where: { author: { email: session.user.email } }
    });
    res.status(200).json(posts);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
