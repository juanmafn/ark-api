var HorasDAL = require('../dal/horasDAL.js');

const horas = [];

// Obtenemos todas las horas de todos los jugadores
horas.getAll = (req, res) => {
    HorasDAL.getAll()
        .then(list => {
            res.status(200).json({data: list});
        })
        .catch(error => {
            res.status(500).json({error: error});
        });
};

horas.anual = (req, res) => {
    HorasDAL.getAnual(req.params)
        .then(result => {
            res.status(200).json({data: result});
        })
        .catch(error => {
            res.status(500).json({error: error});
        });
}

horas.mensual = (req, res) => {
    HorasDAL.getMensual(req.params)
        .then(result => {
            res.status(200).json({data: result});
        })
        .catch(error => {
            res.status(500).json({error: error});
        });
}

horas.diario = (req, res) => {
    HorasDAL.getDiario(req.params)
        .then(result => {
            res.status(200).json({data: result});
        })
        .catch(error => {
            res.status(500).json({error: error});
        });
}

horas.singleAnual = (req, res) => {
    HorasDAL.getSingleAnual(req.params)
        .then(result => {
            res.status(200).json({data: result});
        })
        .catch(error => {
            res.status(500).json({error: error});
        });
}

horas.singleMensual = (req, res) => {
    HorasDAL.getSingleMensual(req.params)
        .then(result => {
            res.status(200).json({data: result});
        })
        .catch(error => {
            res.status(500).json({error: error});
        });
}

horas.singleDiario = (req, res) => {
    HorasDAL.getSingleDiario(req.params)
        .then(result => {
            res.status(200).json({data: result});
        })
        .catch(error => {
            res.status(500).json({error: error});
        });
}

module.exports = horas;