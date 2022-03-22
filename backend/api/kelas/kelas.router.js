const express=require('express');
const router=express.Router();
const{
    controllerGetAll,
    controllerGetId,
    controllerGetIdonly,
    controllerAdd,
    controllerEdit,
    controllerDelete,
    controllerGetAngkatan,
    controllerGetNamakelas,
    controllerGetJurusan,
    } = require('./kelas.controller');
    const authorize = require('../auth/authorize');
    const {IsPetugas, IsAdmin} = require('../auth/level');

//routes
router.get('/',authorize,controllerGetAll); //admin only
router.get('/:id_kelas',authorize, controllerGetIdonly); //admin only
router.get('/id_kelas/:id_kelas',authorize, controllerGetId); //admin only
router.get('/jurusan/:jurusan',authorize,controllerGetJurusan);
router.get('/nama_kelas/:nama_kelas',authorize,controllerGetNamakelas);
router.get('/angkatan/:angkatan',authorize,controllerGetAngkatan);
router.post('/',authorize, controllerAdd); // all semua bisa acses
router.put('/',authorize, controllerEdit); //admin only
router.delete('/:id_kelas',authorize,controllerDelete); //admin only
module.exports = router;