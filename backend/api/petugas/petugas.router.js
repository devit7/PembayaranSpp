const express=require('express');
const router=express.Router();
const{
    controllerGetAll,
    controllerGetId,
    controllerAdd,
    controllerEdit,
    controllerDelete,
    controllerAuth
    } = require('./petugas.controller');
    const authorize = require('../auth/authorize');
    const {IsPetugas, IsAdmin} = require('../auth/level');
    
//routes
router.get('/',controllerGetAll); //admin only
router.get('/:id_petugas',authorize, controllerGetId); //admin only
router.post('/', controllerAdd); // all semua bisa acses
router.put('/',controllerEdit); //admin only
router.delete('/', controllerDelete); //admin only
router.post('/auth',controllerAuth);
module.exports = router;