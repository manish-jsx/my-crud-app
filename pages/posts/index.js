import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';

export default function Posts() {
  const [session, loading] = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (session) {
      fetch('/api/posts')
        .then((res) => res.json())
        .then((data) => setPosts(data));
    }
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You need to be authenticated to view posts.</div>;
  }

  return (
    <div>
      <h1>Your Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
