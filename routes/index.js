const router = require('express').Router();

router.use('/plates', require('./plates'));
router.use('/orders', require('./orders'));

module.exports = router;