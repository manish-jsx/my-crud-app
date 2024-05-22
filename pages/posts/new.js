import { useRouter } from 'next/router';
import PostForm from '../../components/PostForm';
import { useSession } from 'next-auth/client';

export default function NewPost() {
  const [session, loading] = useSession();
  const router = useRouter();

  const createPost = async (post) => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });

    if (res.ok) {
      router.push('/posts');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You need to be authenticated to create a post.</div>;
  }

  return <PostForm onSubmit={createPost} />;
}
