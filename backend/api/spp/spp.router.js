const express=require('express');
const router=express.Router();
const{
    controllerGetAll,
    controllerGetId,
    controllerAdd,
    controllerEdit,
    controllerGetAngkatan,
    controllerDelete
    } = require('./spp.controller');
    const authorize = require('../auth/authorize');
    const {IsPetugas, IsAdmin} = require('../auth/level');

//routes
router.get('/',authorize,controllerGetAll); //admin only
router.get('/:id_spp',authorize, controllerGetId); //admin only
router.get('/angkatan/:angkatan',authorize,controllerGetAngkatan);
router.post('/',authorize, controllerAdd); // all semua bisa acses
router.put('/',authorize, controllerEdit); //admin only
router.delete('/:id_spp',authorize, controllerDelete); //admin only
module.exports = router;