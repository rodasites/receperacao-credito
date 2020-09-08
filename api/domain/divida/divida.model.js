
var Utils = require('../../shared/utils/utils');
var knex = require('../../shared/db/db').connect();

exports.salvarDivida = async (divida) => {
    try {
        var dividaParsed = Utils.parseToKnex(divida);
        await knex('dividas')
            .insert(dividaParsed)
        return true;
    } catch (err) {
        return false;
    }
}

exports.getValorTotalInadimplente = async () => {
    try {
        var result = await knex('dividas')
            .sum({ valor: 'valorInadimplente' })
        return result[0];
    } catch (err) {
        console.log('ERR=> ', err.stack);
        return null;
    }
}

exports.getValorTotalPago = async () => {
    try {
        var result = await knex('dividas')
            .sum({ valor: 'valorPago' })
        return result[0];
    } catch (err) {
        console.log('ERR=> ', err.stack);
        return null;
    }
}

exports.getValorTotalDividas = async () => {
    try {
        var result = await knex('dividas')
            .columns([knex.raw('sum(valorInadimplente + valorPago) as valor')])
            .first()
        return result;
    } catch (err) {
        console.log('ERR=> ', err.stack);
        return null;
    }
}

exports.getInadimplenciasHoje = async () => {
    try {
        let dataAtual = new Date()
        var result = await knex('dividas')
            .count({ valor: 'id' })
            .where('dataDeCriacao', Utils.converteDateToString(dataAtual))
        return result[0];
    } catch (err) {
        console.log('ERR=> ', err.stack);
        return null;
    }
}


