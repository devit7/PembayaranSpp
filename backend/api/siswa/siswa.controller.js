const models = require("../../models/index");
const siswa = models.siswa;
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../auth/secret.json');

module.exports={
    controllerGetAll:async(req,res)=>{
        siswa.findAll()
        .then(result=>{
            res.json({
                sucess:1,
                data:result
            })
        })
    },
    controllerGetId:async(req,res)=>{
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
    controllerAdd:async(req,res)=>{
        const data = {
            nisn : req.body.nisn,
            nis : req.body.nis,
            nama : req.body.nama,
            id_kelas : req.body.id_kelas,
            alamat : req.body.alamat,
            no_tlp : req.body.no_tlp,
            id_spp : req.body.id_spp
        }
        siswa.create(data)
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
        const param = { nisn: req.body.nisn}
        const data = {
            nisn : req.body.nisn,
            nis : req.body.nis,
            nama : req.body.nama,
            id_kelas : req.body.id_kelas,
            alamat : req.body.alamat,
            no_tlp : req.body.no_tlp,
            id_spp : req.body.id_spp
        }
        siswa.update(data , {where: param})
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
        const param = { nisn: req.params.nisn}
        siswa.destroy({where: param})
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
    },
    controllerAuth: async (req,res)=>{
        const data = {
            nisn : req.body.nisn,
            nama : req.body.nama
        }
        let result = await siswa.findOne({where: data})
        if(result){
            // generate token
            let token = jwt.sign({ sub: result.nisn}, config.secret)
            res.json({
                logged: true,
                data: result,
                token: token
            })
        }else{
            res.json({
                logged: false,
                message: "Username or password is incorrect",
                data: result
            })
        }   
    }
}