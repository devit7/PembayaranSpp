const models = require("../../models/index");
const petugas = models.petugas;
const md5 = require('md5');
const config = require('../auth/secret.json');


const auth = require("../auth/authorize");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "pembayaranspp";

module.exports={
    controllerGetAll: async (req,res)=>{
        petugas.findAll()
        .then(result=>{
            res.json({
                sucess:1,
                data:result
            })
        })
    },
    controllerGetIdpetugas: async (req,res)=>{
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
    controllerGet: async (req,res)=>{
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
    }
    
    
}