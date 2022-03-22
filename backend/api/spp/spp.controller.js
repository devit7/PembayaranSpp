const models = require("../../models/index");
const spp = models.spp;
const md5 = require('md5');
const jwt = require('jsonwebtoken');


module.exports={

    controllerGetAll:async (req,res)=>{
        spp.findAll()
        .then(result=>{
            res.json({
                sucess:1,
                data:result
            })
        })
    },
    controllerGetId:async (req,res)=>{
        const param = { id_spp: req.params.id_spp}
        spp.findAll({where:param})
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
    controllerGetIdonly:async(req,res)=>{
        const param = { id_spp: req.params.id_spp}
        spp.findOne({where:param})
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
    controllerGetTahun:async (req,res)=>{
        const param = { tahun: req.params.tahun}
        spp.findAll({where:param})
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
    controllerGetNominal:async (req,res)=>{
        const param = { nominal: req.params.nominal}
        spp.findAll({where:param})
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
    controllerGetAngkatan:async (req,res)=>{
        const param = { angkatan: req.params.angkatan}
        spp.findAll({where:param})
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
    controllerAdd:async (req,res)=>{
        const data = {
            angkatan : req.body.angkatan,
            tahun : req.body.tahun,
            nominal : req.body.nominal
        }
        spp.create(data)
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
    controllerEdit:async (req,res)=>{
        const param = { id_spp: req.body.id_spp}
        const data = {
            id_spp: req.body.id_spp,
            angkatan : req.body.angkatan,
            tahun : req.body.tahun,
            nominal : req.body.nominal
        }
        spp.update(data , {where: param})
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
    controllerDelete:async (req,res)=>{
        const param = { id_spp: req.params.id_spp}
        spp.destroy({where: param})
        .then(result => {
            res.json({
                message : "data has been destroyed",
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