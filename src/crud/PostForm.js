import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { getPost, createPost, updatePost } from '../services/wordpressService';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';

const useStyles = styled((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [excerpt, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [author, setAuthorName] = useState('');
  const [authorName, setFormAuthorName] = useState('');
  const [isImageSelected, setIsImageSelected] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    const post = await getPost(id);
    setTitle(post.title.rendered);
    setContent(post.excerpt.rendered);
    setStatus(post.status);
    setAuthorName(post.author_name);
    setFormAuthorName(post.authorName);
    setFeaturedImageUrl(post.featuredImageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        title,
        excerpt,
        status,
      };
      if (id) {
        await updatePost(id, postData, featuredImage, author);
      } else {
        await createPost(postData, featuredImage, author);
      }
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save post. Please try again later.');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFeaturedImage(file);
    setIsImageSelected(true);
  };

  const handleClearImage = () => {
    setFeaturedImageUrl(null);
    setIsImageSelected(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={useStyles.paper}>
        <Typography component="h1" variant="h5">
          {id ? 'Edit Post' : 'Create Post'}
        </Typography>
        <form className={useStyles.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="Title"
                name="Title"
                variant="outlined"
                required
                fullWidth
                id="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Title"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                id="Status"
                label="Status"
                name="status"
                autoComplete="Status"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Excerpt"
                label="Excerpt"
                name="excerpt"
                autoComplete="Excerpt"
                value={excerpt}
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="image"
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                id="image"
              />
            {isImageSelected && (
              <Stack style={{position: 'relative'}} direction="row" spacing={2} alignItems="center">

                {(featuredImageUrl || featuredImage) && (
                  <>
                <RemoveCircleSharpIcon className={useStyles.removeicon} onClick={handleClearImage} style={{ cursor: 'pointer', position: 'absolute',zIndex: 100,left: '60px',bottom: '45px', }} />
                  
                  <Avatar
                    style={{ padding: '5px' }}
                    sx={{ width: 70, height: 70 }}
                    alt={title}
                    src={featuredImageUrl || URL.createObjectURL(featuredImage)}
                  />
                  </>
                )}
              </Stack>
            )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="author"
                label="Author Name"
                type="text"
                id="AuthorName"
                autoComplete="Author Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
          >
            {id ? 'Update' : 'Create'}
          </Button>
          <Link to={`/`} style={{ textDecoration: 'none' }}>
            <Button size="small" color="primary">
              Back
            </Button>
          </Link>
        </form>
      </div>
    </Container>
  );
};

export default PostForm;
