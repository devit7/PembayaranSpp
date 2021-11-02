const models = require("../../models/index");
const kelas = models.kelas;
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
        const param = { id_kelas: req.params.id_kelas}
        kelas.findOne({where:param})
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
            nama_kelas : req.body.nama_kelas,
            jurusan : req.body.jurusan,
            angkatan : req.body.angkatan
        }
        kelas.create(data)
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
        const param = { id_kelas: req.body.id_kelas}
        const data = {
            id_kelas: req.body.id_kelas,
            nama_kelas : req.body.nama_kelas,
            jurusan : req.body.jurusan,
            angkatan : req.body.angkatan
        }
        kelas.update(data , {where: param})
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
        const param = { id_kelas: req.body.id_kelas}
        kelas.destroy({where: param})
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