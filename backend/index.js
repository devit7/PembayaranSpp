const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const kelasRouter = require("./api/kelas/kelas.router");
app.use("/api/kelas", kelasRouter);

const petugasRouter = require("./api/petugas/petugas.router");
app.use("/api/petugas",petugasRouter);

const pembayaranRouter = require("./api/pembayaran/pembayaran.router");
app.use("/api/pembayaran", pembayaranRouter);

const siswaRouter = require("./api/siswa/siswa.router");
app.use("/api/siswa", siswaRouter);

const sppRouter = require("./api/spp/spp.router");
app.use("/api/spp", sppRouter);

const port = 8000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});