const publicacionesCtrl = {};

const Publicacion = require('../models/Publicacion');

publicacionesCtrl.renderPublicacionFrom = (req, res) => {

    res.render('publicaciones/nueva-publicacion');
};

publicacionesCtrl.createNuevaPublicacion = async (req, res) => {
    const { titulo, precio, categoria, estado, descripcion, telefono, direccion } = req.body;
    const nuevaPublicacion = new Publicacion({ titulo, precio, categoria, estado, descripcion, telefono, direccion });
    nuevaPublicacion.idusuario = req.user.id;
    await nuevaPublicacion.save();
    req.flash('success_msg', 'Publicacion creada satisfactoriamente');
    res.redirect('/publicaciones');
};

publicacionesCtrl.renderPublicaciones = async (req, res) => {
    const publicaciones = await Publicacion.find({ idusuario: req.user.id }).sort({ createdAt: 'desc' }).lean();
    res.render('publicaciones/todas-publicaciones', { publicaciones });
};


publicacionesCtrl.renderEditFrom = async (req, res) => {
    const publicacion = await Publicacion.findById(req.params.id).lean();
    if (publicacion.idusuario != req.user.id) {
        req.flash('error_msg', 'No estas autorizado a ver esta publicacion');
        return res.redirect('/publicaciones');
    }
    res.render('publicaciones/editar-publicacion', { publicacion });
};


publicacionesCtrl.updatePublicacion = async (req, res) => {
    const { titulo, precio, categoria, estado, descripcion, telefono, direccion } = req.body;
    await Publicacion.findByIdAndUpdate(req.params.id, { titulo, precio, categoria, estado, descripcion, telefono, direccion }).lean();
    req.flash('success_msg', 'Publicacion actualizada satisfactoriamente');
    res.redirect('/publicaciones');

};




publicacionesCtrl.deletPublicacion = async (req, res) => {
    await Publicacion.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Publicacion eliminada satisfactoriamente');
    res.redirect('/publicaciones');
};

module.exports = publicacionesCtrl;