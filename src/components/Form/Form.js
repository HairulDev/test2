import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <div className='card card-body'>
        Please Sign In to create your own post and like other's blog.
      </div>
    );
  }

  const handleAddChip = (tag) => {
    console.log(tag)
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
      <div className="card mb-2">
        <div className="card-body">
          <div className="card-title">{currentId ? `Editing a Blog Post` : 'Creating a Blog Post'}</div>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <textarea name="title" className='form-control mb-2' placeholder='Title' label="Title"  value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
            <textarea name="message" className='form-control mb-2' placeholder='Content' label="Content"  multiline rows={3} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
              <ChipInput
                className='mb-2'
                name="tags"
                variant="outlined"
                label="Tags"
                value={postData.tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
              />
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/>
            <button className="btn btn-block btn-primary btn-sm mt-2" type="submit" >Submit</button>
          </form>
            <button className="btn btn-block btn-warning btn-sm mt-2" onClick={clear} >Clear</button>
        </div>
      </div>
  );
};

export default Form;
