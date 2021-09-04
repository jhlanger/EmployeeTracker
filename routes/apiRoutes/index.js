const express = require('express');
const router = express.Router();

router.use(require('./employeesRoutes'));
router.use(require('./titleRoutes'));
router.use(require('./departmentsRoutes'));

module.exports = router;