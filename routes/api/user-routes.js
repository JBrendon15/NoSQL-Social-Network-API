const router = require('express').Router();
const { getUsers, getOneUser, createUser } = require('../../controllers/user-controller');

//route so far: /api/users

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getOneUser);

module.exports = router;
