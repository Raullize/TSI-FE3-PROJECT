function Marca(nome, valor) {
    this.nome = nome;
    this.valor = valor;
}

function Veiculo(marca, modelo, ano, valor) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    this.valor = valor;
}

Veiculo.prototype.getDescricao = function() {
    return `${this.marca} ${this.modelo} (${this.ano}) - ${this.valor}`;
};

function Carro(marca, modelo, ano, combustivel, valor) {
    Veiculo.call(this, marca, modelo, ano, valor);
    this.combustivel = combustivel || 'Flex';
}

Carro.prototype = Object.create(Veiculo.prototype);
Carro.prototype.constructor = Carro;

Carro.prototype.getDescricao = function() {
    return `${Veiculo.prototype.getDescricao.call(this)} - ${this.combustivel}`;
};
