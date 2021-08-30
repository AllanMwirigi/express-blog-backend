
const router = require('express').Router();
const {
  createPost, getPost, getAllPosts, updatePost, deletePost
} = require('../controllers/posts');

router.post('/', createPost);

router.get('/', getAllPosts);

router.get('/:id', getPost);

router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

module.exports = router;
