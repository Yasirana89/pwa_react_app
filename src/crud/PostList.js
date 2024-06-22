import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Pagination, CircularProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { getPosts, deletePost } from '../services/wordpressService';
import Post from './Post';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // State for loading indicator

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100px',
    marginBottom: '20px'
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    const postsPerPage = 3;
    setLoading(true); // Set loading state to true before fetching data
    const { posts: postsData, totalPages } = await getPosts(currentPage, postsPerPage);
    setPosts(postsData);
    setTotalPages(totalPages);
    setLoading(false); // Set loading state to false after fetching data
  };

  const handleDelete = async (postId) => {
    await deletePost(postId);
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Link to="/create" style={{ textDecoration: 'none' }}>
        <Button size="small" color="primary">
          Create Post
        </Button>
      </Link>
      <Container fixed>
        {loading ? ( // Render CircularProgress if loading state is true
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh', // Adjust the height as needed
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          posts.map(post => (
            <Box
              sx={{
                display: 'grid',
                gridAutoRows: '400px',
                gap: 20,
              }}
              key={post.id}
            >
              <Post post={post} onDelete={handleDelete} />
            </Box>
          ))
        )}
      </Container>
      {totalPages && currentPage ? (      <Pagination
        style={paginationStyle}
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />) : (
       <div></div>
      )}

    </React.Fragment>
  );
};

export default PostList;
