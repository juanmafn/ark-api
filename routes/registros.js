var router = require('express').Router();
var registroController = require('../controller/registroController');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', registroController.getAll);
router.post('/', registroController.add);
router.delete('/', registroController.deleteAll);

module.exports = router;
