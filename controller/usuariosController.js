var UsuariosDAL = require('../dal/usuariosDAL.js');

const usuarios = [];

// Obtenemos una lista de todos los usuarios
usuarios.getAll = (req, res) => {
    UsuariosDAL.getAll()
        .then(users => {
            res.status(200).json({ data: users });
        })
        .catch(error => {
            res.status(500).json({error: error});
        });
};

module.exports = usuarios;