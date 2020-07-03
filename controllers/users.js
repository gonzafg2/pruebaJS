var User  = require('../models/users');
var bcrypt   = require('bcryptjs');
exports.user_create = function(req, res, next) {
    if (req.body) {
        let items = req.body
        User.create(items, function(err, newUsers){
            if(err) return res.json({ error: err });
            return res.json(newUsers);
        });
    } else {
        return res.json({status: 'ERROR', message: 'Debe completar todos los campos'}); //opcional mandar un mensaje de error
    }
  }

exports.all_users = function(req, res, next) {
    User.find({}, function(err, users){
        if(err) return res.json({ error: err });
        res.json(users)
    });
}

exports.login = function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user){
        if(err) return res.json({ error: err });
        if(user) {
            let cryptPass = req.body.password;
            bcrypt.compare(cryptPass, user.password, function (err, resp) {
                if(resp) {
                    //console.log("pass correcta");
                    return res.json({data: "OK"})
                } else {
                    return res.json({ error: "email o contraseña incorrecta" })
                }
            });
        } else {
            return res.json({ error: "Email o contraseña incorrecta" })
        }
    });
}