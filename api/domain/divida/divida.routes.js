var express = require('express');
var router = express.Router();
var dividaController = require('./divida.controller');

router.get('/getValorTotalInadimplente', function (req, res) {
    dividaController.getValorTotalInadimplente(req, res);
});

router.get('/getValorTotalPago', function (req, res) {
    dividaController.getValorTotalPago(req, res);
});

router.get('/getValorTotalDividas', function (req, res) {
    dividaController.getValorTotalDividas(req, res);
});

router.get('/getInadimplenciasHoje', function (req, res) {
    dividaController.getInadimplenciasHoje(req, res);
});

module.exports = router;