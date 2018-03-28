var RegistroDAL = require('../dal/registroDAL.js');

const registro = [];

// Obtenemos todos los registros
registro.getAll = (req, res) => {
    RegistroDAL.getAll()
        .then(list => {
            res.status(200).json({ data: list });
        })
        .catch(error => {
            res.status(500).json({error: error});
        });
};

// Creamos registros a partir de los parámetros de la petición
registro.add = (req, res) => {
    const registros = req.body['data'];

    // Si no nos llega los registros, devolvemos un bad request
    if (registros === undefined) {
		var result = {"code": "MISSING_REQUIRED_FIELDS"};
	    res.status(400).json(result);
    }

    RegistroDAL.add(registros)
        .then(result => {
            res.status(200).json();
        });
};

// Borramos todos los registros de la tabla
registro.deleteAll = (req, res) => {
    RegistroDAL.removeAll()
        .then(result => {
            res.status(200).json();
        })
        .catch(error => {
            res.json(500, {error: error});
        });
};

module.exports = registro;