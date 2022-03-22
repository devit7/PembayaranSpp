const express=require('express');
const router=express.Router();
const{
    controllerGetAll,
    controllerGetIdonly,
    controllerGetId,
    controllerAdd,
    controllerEdit,
    controllerDelete,
    controllerGetNama,
    controllerGetKelas,
    controllerGetSpp,    
    controllerAuth
    } = require('./siswa.controller');
    const authorize = require('../auth/authorize');
    const {IsPetugas, IsAdmin} = require('../auth/level');

//routes
router.get('/',authorize,controllerGetAll); //admin only
router.get('/:nisn',authorize, controllerGetId); //admin only
router.get('/nisn/:nisn',authorize, controllerGetId); //admin only
router.get('/nama/:nama',authorize,controllerGetNama);
router.get('/id_kelas/:id_kelas',authorize,controllerGetKelas);
router.get('/id_spp/:id_spp',authorize,controllerGetSpp);
router.post('/',authorize, controllerAdd); // all semua bisa acses
router.put('/',authorize, controllerEdit); //admin only
router.delete('/:nisn',authorize,controllerDelete); //admin only
router.post('/auth',controllerAuth);
module.exports = router;