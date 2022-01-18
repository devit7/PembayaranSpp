const models = require("../../models/index");
const petugas = models.petugas;
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../auth/secret.json');

module.exports={
    controllerGetAll:(req,res)=>{
        petugas.findAll()
        .then(result=>{
            res.json({
                sucess:1,
                data:result
            })
        })
    },
    controllerGetId:(req,res)=>{
        const param = { id_petugas: req.params.id_petugas}
        petugas.findOne({where:param})
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
            username : req.body.username,
            password : req.body.password,
            nama_petugas : req.body.nama_petugas,
            level : req.body.level
        }
        petugas.create(data)
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
        const param = { id_petugas: req.body.id_petugas}
        const data = {
            id_petugas: req.body.id_petugas,
            username : req.body.username,
            password : req.body.password,
            nama_petugas : req.body.nama_petugas,
            level : req.body.level
        }
        petugas.update(data , {where: param})
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
        const param = { id_petugas: req.body.id_petugas}
        petugas.destroy({where: param})
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
    controllerAuth: async (req,res)=>{
        const data = {
            username : req.body.username,
            password : req.body.password,
            level : req.body.level
        }
        let result = await petugas.findOne({where: data})
        if(result){
            // generate token
            let token = jwt.sign({ sub: result.id, level: result.level }, config.secret)
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