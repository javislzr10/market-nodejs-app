const { Router } = require('express');
const router = Router();

const { 
    renderPublicacionFrom, 
    createNuevaPublicacion, 
    renderPublicaciones, 
    renderEditFrom, 
    updatePublicacion, 
    deletPublicacion 
} = require ('../controllers/publicaciones.controller');

const {isAuthenticated} = require('../helpers/auth')

// Nueva Publicacion

router.get('/publicaciones/agregar',isAuthenticated, renderPublicacionFrom);

router.post('/publicaciones/nueva-publicacion', isAuthenticated, createNuevaPublicacion)

// Obtener Todas Las Publicaciones

router.get('/publicaciones', isAuthenticated, renderPublicaciones);

// Editar Publicaciones

router.get("/publicaciones/editar/:id", isAuthenticated, renderEditFrom);

router.put('/publicaciones/editar-publicacion/:id', isAuthenticated, updatePublicacion);

// Eliminar Publicacion

router.delete('/publicaciones/eliminar/:id', isAuthenticated, deletPublicacion);


module.exports = router;