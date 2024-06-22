// import React, { useState, useEffect } from 'react';
// import fetch from 'isomorphic-fetch';
// import PropTypes from 'prop-types';
// import axios from 'axios';

// const PostItems = ({ post }) => {
//     const [imgUrl, setImgUrl] = useState('');
//     const [author, setAuthor] = useState('');
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [updatedTitle, setUpdatedTitle] = useState('');
//     const [updatedContent, setUpdatedContent] = useState('');
//     const [updatedFeaturedMedia, setUpdatedFeaturedMedia] = useState('');
//     const [updatedAuthor, setUpdatedAuthor] = useState('');

//     useEffect(() => {
//         const { featured_media, author: authorId } = post;
        
//         // Encode username and password for basic authentication
//         const username = 'Yasir';
//         const password = 'Yasir8283';
//         const basicAuth = btoa(`${username}:${password}`);
        
//         const getImageUrl = axios.get(`https://localhost/wordpress/wp-json/wp/v2/media/${featured_media}`, {
//             headers: {
//                 'Authorization': `Basic ${basicAuth}`
//             }
//         });
//         const getAuthor = axios.get(`https://localhost/wordpress/wp-json/wp/v2/users/${authorId}`, {
//             headers: {
//                 'Authorization': `Basic ${basicAuth}`
//             }
//         });
    
//         Promise.all([getImageUrl, getAuthor]).then(responses => {
//             const [imageUrlResponse, authorResponse] = responses;
//             setImgUrl(imageUrlResponse.data.source_url);
//             setAuthor(authorResponse.data.name);
//             setIsLoaded(true);
//         });
//     }, [post]);

//     const handleUpdatePost = async () => {
//         try {
//             // Encode username and password for basic authentication
//             const username = 'Yasir';
//             const password = 'Yasir8283';
//             const basicAuth = btoa(`${username}:${password}`);
    
//             // Image upload logic
//             // const imageFile = document.getElementById('imageFile').files[0]; // Get the selected image file
//             // const formData = new FormData(); // Create a FormData object
//             // formData.append('file', imageFile); // Append the image file to the FormData object
    
//             // // Upload image request
//             // const uploadImageResponse = await fetch(`http://localhost/wordpress/wp-json/wp/v2/media/${featured_media}`, {
//             //     method: 'POST',
//             //     headers: {
//             //         'Authorization': `Basic ${basicAuth}`
//             //     },
//             //     body: formData // Pass the FormData object as the request body
//             // });
    
//             // const uploadedImageData = await uploadImageResponse.json();
//             // const featured_media = uploadedImageData.id; // Get the ID of the uploaded image
    
//             // Update post data
//             const postData = {
//                 title: updatedTitle,
//                 content: updatedContent
//             };
    
//             // Update post request
//             const updatePostResponse = await fetch(
//                 `http://localhost/wordpress/wp-json/wp/v2/posts/${post.id}`,
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Basic ${basicAuth}`
//                     },
//                     body: JSON.stringify(postData)
//                 }
//             );
    
//             if (!updatePostResponse.ok) {
//                 throw new Error('Failed to update post');
//             }
    
//             console.log('Post updated successfully');
//             // Update state or handle success as needed
//         } catch (error) {
//             console.error('Error updating post:', error);
//             // Handle error
//         }
//     };

//     const { title, excerpt } = post;

//     return (
//         <div>
//             <h2>{title.rendered}</h2>
//             <img src={imgUrl} alt={title.rendered} />
//             <div><span>Author:</span> {author}</div>
//             <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }}></div>
//             <form onSubmit={(e) => {
//                 e.preventDefault();
//                 handleUpdatePost();
//             }}>
//                 <input
//                     type="text"
//                     value={updatedTitle}
//                     onChange={(e) => setUpdatedTitle(e.target.value)}
//                     placeholder="Updated Title"
//                 />
//                 <textarea
//                     value={updatedContent}
//                     onChange={(e) => setUpdatedContent(e.target.value)}
//                     placeholder="Updated Content"
//                 />
//                 <button type="submit">Update Post</button>
//             </form>
//             <button type='button'>Delete</button>
//         </div>
//     );
// };

// PostItems.propTypes = {
//     post: PropTypes.object.isRequired
// };

// export default PostItems;









import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PostList from './PostList';

const PostItems = ({ post }) => {
    const [imgUrl, setImgUrl] = useState('');
    const [author, setAuthor] = useState('');
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [message, setMessage] = useState('');

    const username = 'Yasir';
    const password = 'Yasir8283';
    const basicAuth = btoa(`${username}:${password}`);

    useEffect(() => {
        const { featured_media, author: authorId } = post;

        const getImageUrl = axios.get(`https://localhost/wordpress/wp-json/wp/v2/media/${featured_media}`, {
            headers: {
                'Authorization': `Basic ${basicAuth}`
            }
        });
        const getAuthor = axios.get(`https://localhost/wordpress/wp-json/wp/v2/users/${authorId}`, {
            headers: {
                'Authorization': `Basic ${basicAuth}`
            }
        });

        Promise.all([getImageUrl, getAuthor]).then(responses => {
            const [imageUrlResponse, authorResponse] = responses;
            setImgUrl(imageUrlResponse.data.source_url);
            setAuthor(authorResponse.data.name);
        });
    }, [post]);

    const handleUpdatePost = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `https://localhost/wordpress/wp-json/wp/v2/posts/${post.id}`,
                {
                    title: updatedTitle,
                    content: updatedContent
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${basicAuth}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update post');
            }
    
            console.log('Post updated successfully');
            <PostItems/>

        } catch (error) {
            console.error('Error updating post:', error);
            setMessage('Error updating post. Please try again.');
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'https://localhost/wordpress/wp-json/wp/v2/posts',
                {
                    title: newTitle,
                    content: newContent
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${basicAuth}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update post');
            }
    

            setMessage('Post created successfully!');
            // Clear form fields after successful creation
            setNewTitle('');
            setNewContent('');
            <PostItems/>
        } catch (error) {
            console.error('Error creating post:', error);
            setMessage('Error creating post. Please try again.');
        }
    };

    const handleDeletePost = async () => {

        try {
            const response = await axios.delete(
                `https://localhost/wordpress/wp-json/wp/v2/posts/${post.id}`,
                {
                    headers: {
                        'Authorization': `Basic ${basicAuth}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            setMessage('Post deleted successfully!');
            <PostItems/>
        } catch (error) {
            console.error('Error deleting post:', error);
            setMessage('Error deleting post. Please try again.');
        }
    };

    const { title, excerpt } = post;

    return (
        <div>
            <h2>{title.rendered}</h2>
            <img src={imgUrl} alt={title.rendered} />
            <div><span>Author:</span> {author}</div>
            <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }}></div>
            <form onSubmit={handleUpdatePost}>
                <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    placeholder="Updated Title"
                />
                <textarea
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                    placeholder="Updated Content"
                />
                <button type="submit">Update Post</button>
            </form>
            <form onSubmit={handleCreatePost}>
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="New Title"
                    required
                />
                <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="New Content"
                    required
                />
                <button type="submit">Create Post</button>
            </form>
            <button onClick={handleDeletePost}>Delete</button>
            {message && <p>{message}</p>}
        </div>
    );
};

PostItems.propTypes = {
    post: PropTypes.object.isRequired
};

export default PostItems;
