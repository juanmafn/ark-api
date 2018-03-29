var Horas = require('../model/horas.js');

const usuarios = [];

usuarios.getAll = () => {
    return new Promise((resolve, reject) => {
        Horas.distinct('nick', (err, users) => {
            if (err) reject(err);
            else resolve(users);
        });
    });
}

module.exports = usuarios;