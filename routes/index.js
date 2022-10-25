const router = require('express').Router();
const apiRoutes = require('./api');

//route so far: /

router.use('/api', apiRoutes);

module.exports = router;