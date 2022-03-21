const express=require('express');
const router=express.Router();
const{
    controllerGetAll,
    controllerGetId,
    controllerGetlevel,
    controllerAdd,
    controllerEdit,
    controllerDelete,
    controllerGetUsername,
    controllerAuth
    } = require('./petugas.controller');
    const authorize = require('../auth/authorize');
    const {IsPetugas, IsAdmin} = require('../auth/level');
//routes
router.get('/',authorize,controllerGetAll); //admin only
router.get('/id_petugas/:id_petugas',authorize, controllerGetId); //admin only
router.get('/username/:username',authorize,controllerGetUsername);
router.get('/level/:level',authorize, controllerGetlevel); //admin only
router.post('/',authorize,controllerAdd); // all semua bisa acses
router.put('/',authorize,controllerEdit); //admin only
router.delete('/:id_petugas',authorize,controllerDelete); //admin only
router.post('/auth',controllerAuth);
module.exports = router;