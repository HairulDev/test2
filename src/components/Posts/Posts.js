import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post/Post';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return 'No posts';

  return (
    isLoading ? "Loading" : (
      <div className="row">
        {posts?.map((post) => (
            <Post post={post} setCurrentId={setCurrentId} />
        ))}
      </div>
    )
  );
};

export default Posts;
