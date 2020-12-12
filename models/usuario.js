var mongoose = require('mongoose');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String,
});

usuarioSchema.method.reservar = function(biciId, desde, haste, cb){
    var reserva = new Reserva({ususario: this._id, bicicleta: biciId, desde, hasta});
    console.log(reserva);
    reserva.save(cb);  
};