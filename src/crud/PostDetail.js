// components/PostForm.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getPost} from '../services/wordpressService';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const PostDetail = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [excerpt, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [postDetail, setDetail] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  



  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    const post = await getPost(id);
    setTitle(post.title.rendered);
    setContent(post.excerpt.rendered);
    setAuthorName(post.authorName);
    setDetail(post.content.rendered);
    setFeaturedImageUrl(post.featuredImageUrl)

  };
  if ((title) && (excerpt) && (authorName) && (postDetail) && (featuredImageUrl)) {
    return (

      <Box sx={{ width: '100%' }}>
        <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={featuredImageUrl}
                    alt=""
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.primary" dangerouslySetInnerHTML={{ __html: excerpt }} />
                    <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: postDetail }} />
                    <Typography gutterBottom variant="h6" component="div">
                      {authorName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link to={`/`} style={{ textDecoration: 'none' }}>
                    <Button size="small" color="primary">
                        Back
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Item>
          </Grid>
        </Grid>
      </Box>
  
    );
  }

};

export default PostDetail;
