const express = require('express');
const router = express.Router();
const authAdmin = require('../middlewares/adminAuth');

//------------------------- TEMPLATE QUE RENDERIZA A PÁGINA PRINCIPAL DO ADMISTRADOR
router.get('/admin', authAdmin, (req, res) => {
    res.render('administrador/index/index', {
        nomeAdministrador: req.session.admins.nome
    });
});
//----------------------------------------------------------------------------------


module.exports = router