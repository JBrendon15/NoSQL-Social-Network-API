const router = require('express').Router();
const { getUsers, getOneUser, createUser } = require('../../controllers/user-controller');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getOneUser);

module.exports = router;
