// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './crud/PostList';
import PostForm from './crud/PostForm';
import PostDetail from './crud/PostDetail';
import Typography from '@mui/material/Typography';
import Navigation from './crud/navigation';
import PostByCategory from './crud/PostsByCategory';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Typography gutterBottom variant="h6" component="div">
            <Navigation/>
        </Typography>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/edit/:id" element={<PostForm />} />
          <Route path="/detail/:id" element={<PostDetail />} />
          <Route path="/postbycategory/:id" element={<PostByCategory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
