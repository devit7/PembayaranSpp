const express=require('express');
const router=express.Router();
const{
    controllerGetAll,
    controllerGetId,
    controllerGetIdall,
    controllerGetIdtahun,
    controllerGetIdbulan,
    controllerGetIdtahunbulan,
    controllerGetIdtahunstatus,
    controllerGetIdbulanstatus,
    controllerAdd,
    controllerEdit,
    controllerGetNisn,
    controllerGetStatus,
    controllerGetAllfilter,
    controllerDelete
    } = require('./pembayaran.controller');


//routes
router.get('/',controllerGetAll); //admin only
router.get('/:id_pembayaran', controllerGetId); //admin only
router.get('/id_pembayaran/:id_pembayaran', controllerGetIdall);
router.get('/tahun/:tahun_spp', controllerGetIdtahun);
router.get('/bulan/:bulan_spp', controllerGetIdbulan);
router.get('/tahunbulan/:tahun_spp/:bulan_spp', controllerGetIdtahunbulan);
router.get('/tahunstatus/:tahun_spp/:status', controllerGetIdtahunstatus);
router.get('/bulanstatus/:bulan_spp/:status', controllerGetIdbulanstatus);
router.get('/tahun_spp/:tahun_spp/:bulan_spp/:status',controllerGetAllfilter);
router.get('/status/:status',controllerGetStatus)
router.get('/nisn/:nisn',controllerGetNisn)
router.post('/', controllerAdd); // all semua bisa acses
router.put('/', controllerEdit); //admin only
router.delete('/:id_pembayaran',controllerDelete); //admin only
module.exports = router;