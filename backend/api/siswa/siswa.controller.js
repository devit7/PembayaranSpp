const models = require("../../models/index");
const siswa = models.siswa;
const md5 = require('md5');
const jwt = require('jsonwebtoken');


module.exports={
    controllerGetAll:(req,res)=>{
        siswa.findAll()
        .then(result=>{
            res.json({
                sucess:1,
                data:result
            })
        })
    },
    controllerGetId:(req,res)=>{
        const param = { nisn: req.params.nisn}
        siswa.findOne({where:param})
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
            nisn : req.body.nisn,
            nis : req.body.nis,
            id_kelas : req.body.id_kelas,
            alamat : req.body.alamat,
            no_tlp : req.body.no_tlp,
            id_spp : req.body.id_spp
        }
        siswa.create(data)
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
        const param = { nisn: req.body.nisn}
        const data = {
            nisn : req.body.nisn,
            nis : req.body.nis,
            id_kelas : req.body.id_kelas,
            alamat : req.body.alamat,
            no_tlp : req.body.no_tlp,
            id_spp : req.body.id_spp
        }
        siswa.update(data , {where: param})
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
        const param = { nisn: req.body.nisn}
        siswa.destroy({where: param})
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