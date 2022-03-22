const models = require("../../models/index");
const pembayaran = models.pembayaran;
const md5 = require('md5');
const config = require('../auth/secret.json');


const auth = require("../auth/authorize");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "pembayaranspp";
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
    controllerGetIdall:(req,res)=>{
        const param = { id_pembayaran: req.params.id_pembayaran}
        pembayaran.findAll({where:param})
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
    controllerGetIdtahun:(req,res)=>{
        const param = { tahun_spp: req.params.tahun_spp}
        pembayaran.findAll({where:param})
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
    controllerGetIdbulan:(req,res)=>{
        const param = { bulan_spp: req.params.bulan_spp}
        pembayaran.findAll({where:param})
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
    controllerGetIdtahunbulan:(req,res)=>{
        pembayaran.findAll({where: { tahun_spp: req.params.tahun_spp, bulan_spp: req.params.bulan_spp}})
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
    controllerGetIdtahunstatus:(req,res)=>{
        pembayaran.findAll({where: { tahun_spp: req.params.tahun_spp, status: req.params.status}})
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
    controllerGetIdbulanstatus:(req,res)=>{
        pembayaran.findAll({where: { bulan_spp: req.params.bulan_spp, status: req.params.status}})
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
    controllerGetAllfilter:(req,res)=>{
        pembayaran.findAll({ where: { tahun_spp: req.params.tahun_spp, bulan_spp: req.params.bulan_spp, status: req.params.status } })
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
    controllerGetStatus:(req,res)=>{
        const param = { status: req.params.status}
        pembayaran.findAll({where:param})
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
    controllerGetNisn:(req,res)=>{
        const param = { nisn: req.params.nisn}
        pembayaran.findAll({where:param})
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
                message: "data has been inserted",
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
                message: "data has been update",
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
        const param = { id_pembayaran: req.params.id_pembayaran}
        pembayaran.destroy({where: param})
        .then(result => {
            res.json({
                message : "data has been destroyed",
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