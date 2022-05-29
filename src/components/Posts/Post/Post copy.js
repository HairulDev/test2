import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

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
          <><ThumbUpAltIcon style={{ fontSize: 11 }} />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
          // <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));
    history.push(`/posts/${post._id}`);
  };

  return (
    <div className="card" >
      <div className="card-body">
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <button className="btn btn-info btn-sm" onClick={(e) => {e.stopPropagation(); setCurrentId(post._id); }} style={{ color: 'white' }}>...</button>
        )}
        <img onClick={openPost} className="card-img-top mb-2" src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
        <h5 className="card-title mb-3">{post.title}</h5>
        <h5 className="card-title">{post.tags.map((tag) => `#${tag} `)}</h5>
        <h6 className="card-muted">{post.name}</h6>
        <h6 className="card-muted">{moment(post.createdAt).fromNow()}</h6>
        <p className="card-text">{post.message.split(' ').splice(0, 20).join(' ')}...</p>
        <button className='btn btn-primary btn-sm float-left' disabled={!user?.result} onClick={handleLike}>Like</button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <button className="btn btn-danger btn-sm float-right" onClick={() => dispatch(deletePost(post._id))}>Delete </button>
        )}
      </div>
    </div>
  );
};

export default Post;