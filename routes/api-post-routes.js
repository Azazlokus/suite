const express = require('express');
const {
  getPost, 
  deletePost,
  editPost,
  getPosts,
  addPost
} = require('../controllers/api-post-controller');

const router = express.Router();

router.get('/api/posts', getPosts);
router.post('/api/post', addPost);
router.get('/api/posts/:id', getPost);
router.delete('/api/post/:id', deletePost);
router.put('/api/edit/:id', editPost);



module.exports = router;
