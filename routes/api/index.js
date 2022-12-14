const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

//route so far: /api/

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;