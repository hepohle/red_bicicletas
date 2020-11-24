var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res){
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}