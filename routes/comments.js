
const router = require('express').Router();
const {
  createComment, getComment, getAllComments, updateComment, deleteComment
} = require('../controllers/comments');

router.post('/', createComment);

router.get('/:postId', getCommentsOfPost);

router.patch('/:id', updateComment);

router.delete('/:id', deleteComment);

module.exports = router;