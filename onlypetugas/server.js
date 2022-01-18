const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

const petugas = require("./router/petugas")
app.use("/api/petugas", petugas)

app.use(express.static(__dirname))


app.listen(8000, () => {
    console.log("Server run on port 8000");
})