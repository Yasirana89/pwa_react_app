// components/PostList.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Pagination, CircularProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { fetchPostsByCategory, deletePost } from '../services/wordpressService';
import CategoryPost from './categoryPost';


const PostByCategory = () => {
const { id } = useParams();
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

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (id) {
        handleCategoryClick();
    }
  }, [id, currentPage]);


  const handleCategoryClick = async () => {
    try {
      setLoading(true);
      const postsPerPage = 3;
      const { posts: postsData, totalPages } = await fetchPostsByCategory(id, currentPage, postsPerPage);
      setPosts(postsData);
      setTotalPages(totalPages);
      console.log('Posts:', postsData);
      setLoading(false);
      // Handle posts data as needed, e.g., update state to display posts
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (postId) => {
    await deletePost(postId);
    setPosts(posts.filter(post => post.id !== postId));
  };


  if (posts) {
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
                    <CategoryPost post={post} onDelete={handleDelete} />
                  </Box>
                ))
              )}
            </Container>
            <Pagination
                style={paginationStyle}
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
      </React.Fragment>
        );
  }
};

export default PostByCategory;
