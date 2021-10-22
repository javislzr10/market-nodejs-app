const {Schema, model} = require('mongoose');

const PublicacionSchema = new Schema({

    titulo: { type: String, required: true },
    precio: { type: String, required: true },
    categoria: { type: String, required: true },
    estado: { type: String, required: true },
    descripcion: { type: String, required: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
    idusuario: { type: String, required: true },

}, {
    timestamps: true,     
});

module.exports = model('Publicacion', PublicacionSchema);