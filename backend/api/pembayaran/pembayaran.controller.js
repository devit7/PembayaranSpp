const models = require("../../models/index");
const pembayaran = models.pembayaran;
const md5 = require('md5');
const jwt = require('jsonwebtoken');


module.exports={
    controllerGetAll:(req,res)=>{
        pembayaran.findAll()
        .then(result=>{
            res.json({
                sucess:1,
                data:result
            })
        })
    },
    controllerGetId:(req,res)=>{
        const param = { id_pembayaran: req.params.id_pembayaran}
        pembayaran.findOne({where:param})
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerAdd:(req,res)=>{
        const data = {
            id_petugas : req.body.id_petugas,
            nisn : req.body.nisn,
            tgl_bayar : req.body.tgl_bayar,
            bulan_spp : req.body.bulan_spp,
            tahun_spp : req.body.tahun_spp,
            status : req.body.status
        }
        pembayaran.create(data)
        .then(result => {
            res.json({
                success : 1,
                data : result,data
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerEdit:(req,res)=>{
        const param = { id_pembayaran: req.body.id_pembayaran}
        const data = {
            id_pembayaran: req.body.id_pembayaran,
            id_petugas : req.body.id_petugas,
            nisn : req.body.nisn,
            tgl_bayar : req.body.tgl_bayar,
            bulan_spp : req.body.bulan_spp,
            tahun_spp : req.body.tahun_spp,
            status : req.body.status
        }
        pembayaran.update(data , {where: param})
        .then(result => {
            res.json({
                success : 1,
                data : result,data
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerDelete: (req,res)=>{
        const param = { id_pembayaran: req.body.id_pembayaran}
        pembayaran.destroy({where: param})
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    }
}