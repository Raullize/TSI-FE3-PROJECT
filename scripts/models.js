function Marca(nome, valor) {
    this.nome = nome;
    this.valor = valor;
}

function Veiculo(marca, modelo, ano) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
}

Veiculo.prototype.getDescricao = function() {
    return `${this.marca} ${this.modelo} (${this.ano})`;
};