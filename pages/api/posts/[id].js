import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { id } = req.query;

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'PUT') {
    const { title, content } = req.body;
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content }
    });
    res.status(200).json(post);
  } else if (req.method === 'DELETE') {
    await prisma.post.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
