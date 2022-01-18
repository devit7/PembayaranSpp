const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const models = require("../../backend/models/index")
const petugas = models.petugas

const md5 = require("md5")

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

app.get("/", auth, async(req, res) => {
    let result = await admin.findAll()
    res.json(result)
})

app.post("/", auth, async(req, res) => {
    let data = {
        username : req.body.username,
            password : req.body.password,
            nama_petugas : req.body.nama_petugas,
            level : req.body.level
    }

    petugas.create(data)
    .then(result => {
        res.json({
            message: "data has been inserted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", auth, async(req, res) => {
    const param = { id_petugas: req.body.id_petugas}
    let data = {
        id_petugas: req.body.id_petugas,
            username : req.body.username,
            password : req.body.password,
            nama_petugas : req.body.nama_petugas,
            level : req.body.level
    }


    petugas.update(data, {where: param})
    .then(result => {
        res.json({
            message: "data has been updated"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:admin_id", auth, async(req, res) => {
    const param = { id_petugas: req.body.id_petugas}
    petugas.destroy({where: param})
    .then(result => {
        res.json({
            message: "data has been deleted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/auth", async (req,res) => {
    let params = {
        username : req.body.email,
            password : req.body.password
    }

    let result = await petugas.findOne({where: params})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app