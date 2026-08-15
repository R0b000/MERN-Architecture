const { Router } = require('express');
const { authRouter } = require('auth-server');
const productRoutes = require('./ProductRoutes');

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRoutes);

module.exports = router;
