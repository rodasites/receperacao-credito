
module.exports = class Divida {

    constructor(divida) {
        this.id = divida.id;
        this.dataDeCriacao = divida.dataDeCriacao;
        this.diasEmAtraso = divida.diasEmAtraso;
        this.valorPago = divida.valorPago;
        this.valorInadimplente = divida.valorInadimplente;
    }
}