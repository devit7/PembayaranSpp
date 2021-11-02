const models = require("../../models/index");
const spp = models.spp;
const md5 = require('md5');
const jwt = require('jsonwebtoken');


module.exports={
    controllerGetAll:(req,res)=>{
        kelas.findAll()
        .then(result=>{
            res.json({
                sucess:1,
                data:result
            })
        })
    },
    controllerGetId:(req,res)=>{
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
    controllerAdd:(req,res)=>{
        const data = {
            angkatan : req.body.angkatan,
            tahun : req.body.tahun,
            nominal : req.body.nominal
        }
        spp.create(data)
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
        const param = { id_spp: req.body.id_spp}
        spp.destroy({where: param})
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