var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/ark_stats');

var HorasSchema = new Schema({
    nick: { type: String },
    fecha: { type: String },
    horas: { type: [Number] },
    total: { type: Number }
}, {versionKey: false});

HorasSchema.index( { nick: 1, fecha: 1 }, { unique: true } );

module.exports = mongoose.model('Horas', HorasSchema);