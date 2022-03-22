const models = require("../../models/index");
const kelas = models.kelas;
const md5 = require('md5');
const jwt = require('jsonwebtoken');


module.exports={
    controllerGetAll:async(req,res)=>{
        kelas.findAll()
        .then(result=>{
            res.json({
                sucess:1,
                data:result
            })
        })
    },
    controllerGetIdonly:async(req,res)=>{
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
    controllerGetId:async(req,res)=>{
        const param = { id_kelas: req.params.id_kelas}
        kelas.findAll({where:param})
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
    controllerGetNamakelas:async(req,res)=>{
        const param = { nama_kelas: req.params.nama_kelas}
        kelas.findAll({where:param})
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
    controllerGetJurusan:async(req,res)=>{
        const param = { jurusan: req.params.jurusan}
        kelas.findAll({where:param})
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
    controllerGetAngkatan:async(req,res)=>{
        const param = { angkatan: req.params.angkatan}
        kelas.findAll({where:param})
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
    controllerAdd:async(req,res)=>{
        const data = {
            nama_kelas : req.body.nama_kelas,
            jurusan : req.body.jurusan,
            angkatan : req.body.angkatan
        }
        kelas.create(data)
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
    controllerEdit:async(req,res)=>{
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
    controllerDelete: async (req,res)=>{
        const param = { id_kelas: req.params.id_kelas}
        kelas.destroy({where: param})
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