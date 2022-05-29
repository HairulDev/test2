import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { likePost, deletePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><span style={{ fontSize: 11 }} />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
          // <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><span fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><span fontSize="small" />&nbsp;Like</>;
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));
    history.push(`/posts/${post._id}`);
  };

  return (
    <div className="col-md-4 mb-2">
      <div className="card">
        <div className="card-body">
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <button className="btn btn-outline-info btn-sm" onClick={(e) => { e.stopPropagation(); setCurrentId(post._id); }}>Edit</button>
          )}
          <img onClick={openPost} className="card-img-top mb-2" src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
          <h5 className="card-title mb-3">{post.title}</h5>
          <h5 className="card-title">{post.tags.map((tag) => `#${tag} `)}</h5>
          <span className="card-muted">{post.name}</span>
          <p className="card-muted">{moment(post.createdAt).fromNow()}</p>
          <p className="card-text">{post.message.split(' ').splice(0, 20).join(' ')}...</p>
          <button className="btn btn-outline-primary btn-sm float-left" disabled={!user?.result} onClick={handleLike}><Likes /></button>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <button className="btn btn-outline-danger btn-sm float-right" onClick={() => dispatch(deletePost(post._id))}>Delete </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
