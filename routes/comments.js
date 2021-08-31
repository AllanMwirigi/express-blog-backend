
const router = require('express').Router();
const {
  createComment, getCommentsOfPost, getAllComments, updateComment, deleteComment
} = require('../controllers/comments');

router.post('/', createComment);

router.get('/', getAllComments);

router.get('/:postId', getCommentsOfPost);

router.patch('/:id', updateComment);

router.delete('/:id', deleteComment);

module.exports = router;