const express=require('express');
const router=express.Router();
const{
    controllerGetAll,
    controllerGetId,
    controllerAdd,
    controllerEdit,
    controllerDelete
    } = require('./siswa.controller');


//routes
router.get('/',controllerGetAll); //admin only
router.get('/:nisn', controllerGetId); //admin only
router.post('/', controllerAdd); // all semua bisa acses
router.put('/', controllerEdit); //admin only
router.delete('/',controllerDelete); //admin only
module.exports = router;