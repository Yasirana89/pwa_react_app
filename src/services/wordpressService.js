// src/services/wordpressService.js
import axios from 'axios';
const API_URL = 'https://localhost/wordpress/wp-json/wp/v2';
const USERNAME = 'Yasir';
const PASSWORD = 'Yasir8283';

const basicAuth = btoa(`${USERNAME}:${PASSWORD}`);
const headers = {
  'Authorization': `Basic ${basicAuth}`,
  'Content-Type': 'application/json',
};

const Mediaheaders = {
  'Authorization': `Basic ${basicAuth}`,
  'Content-Type': 'multipart/form-data',
};

export const getPosts = async (currentPage, perPage) => {
  try {
    const response = await fetch(`${API_URL}/posts?page=${currentPage}&per_page=${perPage}`, {
      headers
    });

    const data = await response.json();

    // Assuming your API returns the total number of pages in the response headers
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages'));

    // Fetch additional information for each post
    const postsWithExtraInfo = await Promise.all(
      data.map(async (post) => {
        const featuredMediaId = post.featured_media;
        const featuredMediaResponse = await fetch(`${API_URL}/media/${featuredMediaId}`,{
          headers
        });
        const featuredMediaData = await featuredMediaResponse.json();
        const featuredImageUrl = featuredMediaData.source_url;

        const authorId = post.author;
        const authorResponse = await fetch(`${API_URL}/users/${authorId}`,{
          headers
        });
        const authorData = await authorResponse.json();
        const authorName = authorData.name;

        return {
          ...post,
          featuredImageUrl,
          authorName,
        };
      })
    );

    return { posts: postsWithExtraInfo, totalPages }; // Return posts and totalPages
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
};


export const getPost = async (postId) => {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      headers
    });
    const post = await response.json();

    // Fetch featured image
    const featuredMediaId = post.featured_media;
    const featuredMediaResponse = await fetch(`${API_URL}/media/${featuredMediaId}`, {
      headers
    });
    const featuredMediaData = await featuredMediaResponse.json();
    const featuredImageUrl = featuredMediaData.source_url;

    // Fetch author
    const authorId = post.author;
    const authorResponse = await fetch(`${API_URL}/users/${authorId}`, {
      headers
    });
    const authorData = await authorResponse.json();
    const authorName = authorData.name;

    // Return the post with additional information
    return {
      ...post,
      featuredImageUrl,
      authorName
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Error('Failed to fetch post');
  }
};

export const createPost = async (formData, featuredImageUrl, author) => {
  try {

    // Send a POST request to upload the image
    const imageUrl = await uploadImage(featuredImageUrl);

    // Update the formData with the image URL
    formData.featured_media = imageUrl;


    // Send the request to create the post with formData
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    // Update the author name if it exists
    if (author) {
      await fetch(`${API_URL}/users/${data.author}`, {
        method: 'PUT', // Use PUT method to update existing user
        headers,
        body: JSON.stringify({ name: author }),
      });
    }

    return data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
};


export const uploadImage = async (image) => {
  try {
    // Create FormData object to hold the image
    const formData = new FormData();
    formData.append('file', image);

    // Send a POST request to upload the image
    const response = await axios.post(
      `${API_URL}/media`,
      formData,
      {
        headers: Mediaheaders
      }
    );

    // Extract and return the URL of the uploaded image
    return response.data.id;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

export const updatePost = async (postId, postData, featuredImage, author) => {

      // Send a POST request to upload the image
      const imageUrl = await uploadImage(featuredImage);

      // Update the formData with the image URL
      postData.featured_media = imageUrl;

      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(postData),
      });

      const data = await response.json();


    // Update the author name if it exists
    if (author) {
      await fetch(`${API_URL}/users/${data.author}`, {
        method: 'PUT', // Use PUT method to update existing user
        headers,
        body: JSON.stringify({ name: author }),
      });
    }

    return data;
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${postId}`, {
      headers
    });

    if (response.status === 200) {
      return response.data; // If successful, you might want to return something or perform further actions
    } else {
      throw new Error('Failed to delete post'); // Throw an error for non-200 status codes
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post'); // Rethrow the error for higher-level error handling
  }
};


export const fetchMenuItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`,{
      headers
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw new Error('Failed to fetch menu items');
  }
};


export const fetchPostsByCategory = async (categoryId, currentPage, perPage) => {
  try {
    const response = await axios.get(`${API_URL}/posts?category=${categoryId}&page=${currentPage}&per_page=${perPage}`,{
      headers
    });

    const posts = response.data;

    // Assuming your API returns the total number of pages in the response headers
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages'));

    // Iterate over each post to fetch additional information
    const postsWithExtraInfo = await Promise.all(
      posts.map(async (post) => {
        // Fetch featured image
        const featuredMediaId = post.featured_media;
        const featuredMediaResponse = await fetch(`${API_URL}/media/${featuredMediaId}`,{
          headers
        });
        const featuredMediaData = await featuredMediaResponse.json();
        const featuredImageUrl = featuredMediaData.source_url;

        // Fetch author
        const authorId = post.author;
        const authorResponse = await fetch(`${API_URL}/users/${authorId}`,{
          headers
        });
        const authorData = await authorResponse.json();
        const authorName = authorData.name;

        return {
          ...post,
          featuredImageUrl,
          authorName
        };
      })
    );

    return { posts: postsWithExtraInfo, totalPages };
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    throw new Error('Failed to fetch posts by category');
  }
};