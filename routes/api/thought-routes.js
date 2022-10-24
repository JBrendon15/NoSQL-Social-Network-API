const router = require('express').Router();
const { getThoughts, getOneThought, createThought } = require('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getOneThought);

module.exports = router;