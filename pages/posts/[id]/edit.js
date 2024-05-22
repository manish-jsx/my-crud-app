import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import PostForm from '../../../components/PostForm';
import { useSession } from 'next-auth/client';

export default function EditPost() {
  const [session, loading] = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }
  }, [id]);

  const updatePost = async (updatedPost) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPost)
    });

    if (res.ok) {
      router.push('/posts');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You need to be authenticated to edit a post.</div>;
  }

  if (!post) {
    return <div>Loading post...</div>;
  }

  return <PostForm onSubmit={updatePost} initialData={post} />;
}
