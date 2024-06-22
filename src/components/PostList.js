import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItems from './PostItems';


const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const username = 'Yasir';
        const password = 'Yasir8283';
        const basicAuth = btoa(`${username}:${password}`);

        const response = await axios.get('http://localhost/wordpress/wp-json/wp/v2/posts', {
          headers: {
            'Authorization': `Basic ${basicAuth}`
          }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Latest Posts</h1>
      <ul>
        {posts.map(post => (
            <PostItems key={post.id} post={post}/>
        ))}
      </ul>
    </div>
  );
};

export default PostList;