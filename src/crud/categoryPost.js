// components/Post.js
import React from 'react';
import { Link } from 'react-router-dom';
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

const categoryPost = ({ post, onDelete }) => {
  const featuredImage = post._embedded && post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : null;

  const handleDelete = async () => {
      await onDelete(post.id);
  };

  if (post) {
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
                    image={post.featuredImageUrl}
                    alt=""
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.title.rendered}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    <Typography gutterBottom variant="h6" component="div">
                      {post.authorName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link to={`/detail/${post.id}`} style={{ textDecoration: 'none' }}>
                    <Button size="small" color="primary">
                        Detail
                    </Button>
                  </Link>
                  <Link to={`/edit/${post.id}`} style={{ textDecoration: 'none' }}>
                    <Button size="small" color="primary">
                        Edit Post
                    </Button>
                  </Link>
                  <Button onClick={handleDelete} size="small" color="primary">
                      Delete
                  </Button>
                </CardActions>
              </Card>
            </Item>
          </Grid>
        </Grid>
      </Box>
  
    );
  }
};

export default categoryPost;
