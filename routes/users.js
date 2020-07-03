var express = require('express');
var userController = require('../controllers/users');
var router = express.Router();

/* Post user  */
router.post('/', function(req, res, next) {
  userController.user_create(req, res, next);
});

// Esta es la ruta que se debe llamar para traer todos los usuarios del sistema.
router.get('/', function(req, res, next) {
  userController.all_users(req, res, next);
});

router.post('/login', function (req, res, next) {
  if(req.body.email && req.body.password) {
    userController.login(req, res, next);
  } else {
    return res.status(400).json({
        message : 'Faltan Datos',  error: true
    });
  }
});

module.exports = router;
