var Usuario = require('../../models/usuario');

exports.usuarios_list = function(req, res){
    Usuario.find({}, function(err, usuario){
        res.status(200).json({
            ususarios: usuarios
        });
    });
};

exports.usuarios_create = function(req, res){
    var ususario =new Usuario({nombre: req.body.nombre});

    usuario.save(function(err){
        res.status(200).json(ususario);
    });
};

exports.usuario_reservar = function(req, res){
    Usuario.findById(req.body.id, function(err, ususario){
        console.log(usuario);
        ususario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, function(err){
            console.log('reserva!!!');
            res.status(200).send();
        });
    });
};