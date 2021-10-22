const { Router } = require('express');
const router = Router();

const { renderIndex, renderDui } = require('../controllers/index.controller')


router.get('/', renderIndex)

router.get('/dui', renderDui)




module.exports = router;