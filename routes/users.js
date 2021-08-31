
const router = require('express').Router();
const {
  createUser, getUser, getAllUsers, updateUser, deleteUser
} = require('../controllers/users');

router.post('/', createUser);

router.get('/', getAllUsers);

router.get('/:id', getUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
