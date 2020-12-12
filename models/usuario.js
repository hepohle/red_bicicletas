var mongoose = require('mongoose');
var Reserva = require('./reserva');
const bcrypt = require('bcrypt');

const saltRounds = 10;

var Schema = mongoose.Schema;

const validateEmail = function(email){
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "El mail es obligatorio"],
        lowercase: true,
        validate: [validateEmail, "Por favor ingrese un email válido"]
        match: [/\S+@\S+\.\S+/]
    },
    password: {
        type: String,
        require: [true, "El password es obligatorio"]
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    },
});

usuarioSchema.pre('save', function(next){
    if (this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

ususarioSchema.method.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.method.reservar = function(biciId, desde, haste, cb){
    var reserva = new Reserva({ususario: this._id, bicicleta: biciId, desde, hasta});
    console.log(reserva);
    reserva.save(cb);  
};