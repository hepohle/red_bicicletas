const nodemailer = require('nodemailer');
    const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'chaim.sauer@ethereal.email',
        pass: 'SjB1XqukabNRVFEwfK'
    }
};
module.exports = nodemailer.createTransport(mailConfig);


//    const nodemailer = require('nodemailer');

//      const mailConfig = {
//        host: 'smtp.ethereal.email',
//        port: 587,
//        auth: {
//            user: 'brigitte.monahan@ethereal.email',
//            pass: 'P9GFAnFdtNUwh1RuSA',
//        }
//    };

//    module.exports = nodemailer.createTransport(mailConfig);