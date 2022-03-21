const express=require('express');
const router=express.Router();
const{
    controllerGetAll,
    controllerGetId,
    controllerAdd,
    controllerEdit,
    controllerGetNisn,
    controllerDelete
    } = require('./pembayaran.controller');


//routes
router.get('/',controllerGetAll); //admin only
router.get('/:id_pembayaran', controllerGetId); //admin only
router.get('/nisn/:nisn',controllerGetNisn)
router.post('/', controllerAdd); // all semua bisa acses
router.put('/', controllerEdit); //admin only
router.delete('/:id_pembayaran',controllerDelete); //admin only
module.exports = router;