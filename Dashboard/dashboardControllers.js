const express = require('express');
const router  = express.Router();

//------------------------- TEMPLATE QUE RENDERIZA A PÁGINA PRINCIPAL DO ADMISTRADOR
router.get('/admin', (req, res) => {
    res.render('administrador/index/index');
});
//----------------------------------------------------------------------------------


module.exports = router