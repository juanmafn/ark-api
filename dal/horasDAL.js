var Horas = require('../model/horas.js');

const horas = [];

horas.insertOrUpdate = (nick, fecha) => {
    return new Promise((resolve, reject) => {
        fecha = new Date(fecha);
        const criteria = {
            nick: nick,
            fecha: require('../common/utils.js').dateToString(fecha)
        };
        Horas.findOne(criteria, (err, horas) => {
            if (horas) {
                var vHoras = horas.horas;
                vHoras[fecha.getHours()] += 5;
                Horas.update({ _id: horas._id}, { $set: { horas: vHoras, total: horas.total + 5 } }, (err, ok) => {
                    resolve(true);
                });
            } else if (!err) {
                var vHoras = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                vHoras[fecha.getHours()]+=5;
                new Horas({
                    nick: criteria.nick,
                    fecha: criteria.fecha,
                    horas: vHoras,
                    total: 5
                }).save((err, ok) => {
                    resolve(true);
                });
            } else {
                resolve(false);
            }
        }); 
    });
};

horas.getAll = () => {
    return new Promise((resolve, reject) => {
        Horas.find((err, list) => {
            if (err) reject(err);
            else resolve(list);
        });
    });
}

horas.getAnual = (params) => {
    return new Promise((resolve, reject) => {
        Horas.find().where('fecha').regex(params.year).exec((err, horas) => {
            let result = {};
            result['fecha'] = params.year;
            result['series'] = [];
            jugadores = {};
            let horasAno = [0,0,0,0,0,0,0,0,0,0,0,0];
            horas.forEach(jugador => {
                let pos = +jugador.fecha.split('-')[1] - 1;
                if (!(jugador.nick in jugadores)) {
                    jugadores[jugador.nick] = {
                        name: jugador.nick,
                        data: horasAno.slice(),
                        total: 0
                    }
                }
                jugadores[jugador.nick].data[pos] += jugador.total;
                jugadores[jugador.nick].total += jugador.total;
            });
            for (let jugador in jugadores) {
                result['series'].push({
                    name: jugadores[jugador].name,
                    data: jugadores[jugador].data.map(x => x / 60),
                    total: jugadores[jugador].total / 60
                });
            }
            result['series'].sort((a,b) => {
                if (a.total < b.total)
                    return 1;
                if (a.total > b.total)
                    return -1;
                return 0;
            });
            resolve(result);
        });
    });
}

horas.getMensual = (params) => {
    return new Promise((resolve, reject) => {
        const fecha = new Date(`${params.year}-${params.month}`);
        const year = fecha.getFullYear();
        let month = fecha.getMonth() + 1;
        month = (month < 10) ? '0' + month : month;
        const date = `${year}-${month}`;
        Horas.find().where('fecha').regex(date).exec((err, horas) => {
            let result = {};
            result['fecha'] = date.replace('-', '/');
            result['series'] = [];
            jugadores = {};
            let horasMes = [];
            for (let i = 0; i < require('../common/utils.js').getNumeroDiasMes(+params.year, +params.month); i++) {
                horasMes.push(0);
            }
            horas.forEach(jugador => {
                let pos = +jugador.fecha.split('-')[2] - 1;
                if (!(jugador.nick in jugadores)) {
                    jugadores[jugador.nick] = {
                        name: jugador.nick,
                        data: horasMes.slice(),
                        total: 0
                    }
                }
                jugadores[jugador.nick].data[pos] += jugador.total;
                jugadores[jugador.nick].total += jugador.total;
            });
            for (let jugador in jugadores) {
                result['series'].push({
                    name: jugadores[jugador].name,
                    data: jugadores[jugador].data.map(x => x / 60),
                    total: jugadores[jugador].total / 60
                });
            }
            result['series'].sort((a,b) => {
                if (a.total < b.total)
                    return 1;
                if (a.total > b.total)
                    return -1;
                return 0;
            });
            resolve(result);
        });
    });
}

horas.getDiario = (params) => {
    return new Promise((resolve, reject) => {
        const fecha = new Date(`${params.year}-${params.month}-${params.day}`);
        const criteria = {
            fecha: require('../common/utils.js').dateToString(fecha)
        };
        Horas.find(criteria, (err, horas) => {
            let result = {};
            result['fecha'] = require('../common/utils.js').dateToString2(fecha);
            result['series'] = [];
            horas.forEach(jugador => {
                result['series'].push({
                    name: jugador.nick,
                    data: jugador.horas.map(x => x / 60),
                    total: jugador.total / 60
                });
            });
            result['series'].sort((a,b) => {
                if (a.total < b.total)
                    return 1;
                if (a.total > b.total)
                    return -1;
                return 0;
            });
            resolve(result);
        });
    });
}


horas.getSingleAnual = (params) => {
    return new Promise((resolve, reject) => {
        Horas.find().where('nick').equals(params.player).where('fecha').regex(params.year).exec((err, horas) => {
            let result = {};
            result['fecha'] = params.year;
            result['series'] = [];
            jugadores = {};
            let horasAno = [0,0,0,0,0,0,0,0,0,0,0,0];
            let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            horas.forEach(jugador => {
                let pos = +jugador.fecha.split('-')[1] - 1;
                if (!(jugador.nick in jugadores)) {
                    jugadores[jugador.nick] = {
                        name: jugador.nick,
                        data: horasAno.slice(),
                        total: 0
                    }
                }
                jugadores[jugador.nick].data[pos] += jugador.total;
                jugadores[jugador.nick].total += jugador.total;
            });
            for (let jugador in jugadores) {
                let m = 0;
                jugadores[jugador].data.forEach(hora => {
                    let name = meses[m];
                    result['series'].push({
                        name: name,
                        data: [hora / 60],
                        total: hora / 60
                    });
                    m++;
                });
            }
            resolve(result);
        });
    });
}

horas.getSingleMensual = (params) => {
    return new Promise((resolve, reject) => {
        const fecha = new Date(`${params.year}-${params.month}`);
        const year = fecha.getFullYear();
        let month = fecha.getMonth() + 1;
        month = (month < 10) ? '0' + month : month;
        const date = `${year}-${month}`;
        Horas.find().where('nick').equals(params.player).where('fecha').regex(date).exec((err, horas) => {
            let result = {};
            result['fecha'] = date.replace('-', '/');
            result['series'] = [];
            jugadores = {};
            let horasMes = [];
            for (let i = 0; i < require('../common/utils.js').getNumeroDiasMes(+params.year, +params.month); i++) {
                horasMes.push(0);
            }
            horas.forEach(jugador => {
                let pos = +jugador.fecha.split('-')[2] - 1;
                if (!(jugador.nick in jugadores)) {
                    jugadores[jugador.nick] = {
                        name: jugador.nick,
                        data: horasMes.slice(),
                        total: 0
                    }
                }
                jugadores[jugador.nick].data[pos] += jugador.total;
                jugadores[jugador.nick].total += jugador.total;
            });
            for (let jugador in jugadores) {
                let d = 1;
                jugadores[jugador].data.forEach(hora => {
                    let name = ((d < 10) ? '0' + d : d);
                    result['series'].push({
                        name: name,
                        data: [hora / 60],
                        total: hora / 60
                    });
                    d++;
                });
            }
            resolve(result);
        });
    });
}

horas.getSingleDiario = (params) => {
    return new Promise((resolve, reject) => {
        const fecha = new Date(`${params.year}-${params.month}-${params.day}`);
        const criteria = {
            fecha: require('../common/utils.js').dateToString(fecha),
            nick: params.player
        };
        Horas.findOne(criteria, (err, jugador) => {
            let result = {};
            result['fecha'] = require('../common/utils.js').dateToString2(fecha);
            result['series'] = [];
            let h = 0;
            if (jugador) {
                jugador.horas.forEach(hora => {
                    let name = ((h < 10) ? '0' + h : h);
                    result['series'].push({
                        name: name,
                        data: [hora / 60],
                        total: hora / 60
                    });
                    h++;
                });
            }
            resolve(result);
        });
    });
}

module.exports = horas;