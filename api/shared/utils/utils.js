var _ = require('lodash');
// parse para o knex
exports.parseToKnex = (objectToInsertOrUpdate) => {
    return this.clearObject(_.transform(objectToInsertOrUpdate, (r, v, k) => { r[k.trim()] = v }));
}

exports.clearObject = (obj) => {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
}

exports.converteData = (data) => {
    var dateParts = data.split("/");
    return dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
}

exports.converteDateToString = (date) => {
    let ano = date.getFullYear()
    let mes = date.getMonth() + 1;
    let dia = date.getDate();
    if (mes < 10) {
        mes = `0${mes}`
    }
    if (dia < 10) {
        dia = `0${dia}`
    }
    return `${ano}/${mes}/${dia}`
}

exports.parseTopicoDivida = (topico) => {
    let parseTopico = JSON.parse(topico)
    if (verificaNumero(parseTopico.id)) {
        parseTopico.id = Number(parseTopico.id)
    } else {
        return undefined
    }

    if (verificaNumero(parseTopico.diasEmAtraso)) {
        parseTopico.diasEmAtraso = Number(parseTopico.diasEmAtraso)
    } else {
        return undefined
    }

    if (verificaNumero(parseTopico.valorPago)) {
        parseTopico.valorPago = Number(parseTopico.valorPago)
    } else {
        return undefined
    }

    if (verificaNumero(parseTopico.valorInadimplente)) {
        parseTopico.valorInadimplente = Number(parseTopico.valorInadimplente)
    } else {
        return undefined
    }
    
    if (verificaStringData(parseTopico.dataDeCriacao)) {
        parseTopico.dataDeCriacao = this.converteData(parseTopico.dataDeCriacao);
    } else {
        return undefined
    }
    return parseTopico;
}

verificaNumero = (numero) => {
    if (numero) {
        parseNumero = Number(numero)
        if (!parseNumero) {
            return false;
        } else {
            return true
        }
    } else {
        return false
    }
}

verificaStringData = (data) => {
    if (data) {
        parseData = new Date(data)
        if (!parseData) {
            return false;
        } else {
            return true
        }
    } else {
        return false
    }
}












