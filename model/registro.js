var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/ark_stats');

var RegistroSchema = new Schema({
    nick: { type: String },
    time: { type: String }
}, {versionKey: false});

RegistroSchema.index( { nick: 1, time: 1 }, { unique: true } );

module.exports = mongoose.model('Registro', RegistroSchema);