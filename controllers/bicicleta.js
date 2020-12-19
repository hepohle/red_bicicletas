var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req, res) {
    Bicicleta.allBicis((err, bicis) => {
        res.render('bicicletas/index', { bicis: bicis })
    })
}

exports.bicicleta_create_get = function(req, res) {
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = function(req, res) {
    var bici = new Bicicleta({
        code: req.body.code,
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng]
    });

    console.log(bici)
    bici.save(function(err) {
        if (err) console.log(err)
        res.status(200)
        res.redirect('/bicicletas');
    });


}

exports.bicicleta_update_get = function(req, res) {
    Bicicleta.findById(req.params.id, (err, bici) => {
        if (err) console.log(err);
        res.render('bicicletas/update', { bici });
    })

}

exports.bicicleta_update_post = function(req, res) {
    Bicicleta.findByIdAndUpdate({ _id: req.params.id }, {
            code: req.body.code,
            color: req.body.color,
            modelo: req.body.modelo,
            ubicacion: [req.body.lat, req.body.lng]
        },
        (err, bici) => {
            res.redirect('/bicicletas');
        })

}

exports.bicicleta_delete_post = function(req, res) {
    Bicicleta.findByIdAndRemove({ _id: req.body.id }, (err) => {
        if (err) console.log(err);
        res.redirect('/bicicletas');
    })

}