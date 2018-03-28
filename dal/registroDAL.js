var Registro = require('../model/registro.js');
var HorasDAL = require('./horasDAL.js');

const registro = [];

// Obtenemos todos los registros
registro.getAll = () => {
    return new Promise((resolve, reject) => {
        Registro.find((err, list) => {
            if (err) reject(err);
            else resolve(list);
        });
    });
}

// Creamos registros a partir de los parámetros de la petición
registro.add = (registros) => {
    return new Promise((resolve, reject) => {
        insertOrUpdate(registros).then(res => {
            resolve(true);
        });
    });
}

// Función recursiva para crear una inserción secuencial
function insertOrUpdate(registros) {
    return new Promise((resolve, reject) => {
        const registro = registros.pop();
        if (registro) {
            new Registro({nick: registro.nick, time: registro.time}).save((err, registro) => {
                if (registro) {
                    HorasDAL.insertOrUpdate(registro.nick, registro.time).then(res => {
                        insertOrUpdate(registros)
                        .then(res => {
                            resolve(true)
                        })
                        .catch(error => {
                            resolve(true)
                        });
                    });
                } else {
                    insertOrUpdate(registros)
                        .then(res => {
                            resolve(true)
                        })
                        .catch(error => {
                            resolve(true)
                        });
                }
            });
        } else {
            resolve(true);
        }
    });
}

// Borramos todos los registros de la tabla
registro.removeAll = () => {
    return new Promise((resolve, reject) => {
        Registro.remove({}, (err) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
}

module.exports = registro;