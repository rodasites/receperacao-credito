var networkHandler = require('../../shared/network/response-handle');
var Divida = require('./divida');
var dividaModel = require('./divida.model');
var CODE = require('../../shared/codes/code');
var Utils = require('../../shared/utils/utils');

exports.salvarDivida = async (req) => {
    var dividaParse = Utils.parseTopicoDivida(req)
    if (dividaParse) {
        var divida = new Divida(dividaParse);
        var result = await dividaModel.salvarDivida(divida)
        if (result) {
            console.log("Tópico salvo com sucesso")
            return true
        } else {
            console.log("Erro ao salvar")
            return false
        }
    } else {
        console.log("Formato do tópico inválido")
        return false
    }
}

exports.getValorTotalInadimplente = async (req, res) => {
    var totalInadimplente = await dividaModel.getValorTotalInadimplente();
    if (totalInadimplente) {
        networkHandler.responseSuccess(CODE.SUCCESS, totalInadimplente, res);
    } else {
        networkHandler.responseError(CODE.BAD_REQUEST, ERROR.INTERNO, res);
    }
}

exports.getValorTotalPago = async (req, res) => {
    var totalPago = await dividaModel.getValorTotalPago();
    if (totalPago) {
        networkHandler.responseSuccess(CODE.SUCCESS, totalPago, res);
    } else {
        networkHandler.responseError(CODE.BAD_REQUEST, ERROR.INTERNO, res);
    }
}

exports.getValorTotalDividas = async (req, res) => {
    var total = await dividaModel.getValorTotalDividas();
    if (total) {
        networkHandler.responseSuccess(CODE.SUCCESS, total, res);
    } else {
        networkHandler.responseError(CODE.BAD_REQUEST, ERROR.INTERNO, res);
    }
}

exports.getInadimplenciasHoje = async (req, res) => {
    var total = await dividaModel.getInadimplenciasHoje();
    if (total) {
        networkHandler.responseSuccess(CODE.SUCCESS, total, res);
    } else {
        networkHandler.responseError(CODE.BAD_REQUEST, ERROR.INTERNO, res);
    }
}

