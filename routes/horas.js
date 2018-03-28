var router = require('express').Router();
var horasController = require('../controller/horasController');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', horasController.getAll);

router.get('/several/anual/:year', horasController.anual);
router.get('/several/mensual/:year/:month', horasController.mensual);
router.get('/several/diario/:year/:month/:day', horasController.diario);

router.get('/single/anual/:player/:year', horasController.singleAnual);
router.get('/single/mensual/:player/:year/:month', horasController.singleMensual);
router.get('/single/diario/:player/:year/:month/:day', horasController.singleDiario);

module.exports = router;