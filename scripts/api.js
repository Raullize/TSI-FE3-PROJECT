class FipeAPI {
    constructor() {
        this.baseURL = API_CONFIG.baseURL;
    }

    async getMarcas() {
        try {
            const response = await fetch(`${this.baseURL}/marcas`);
            if (!response.ok) {
                throw new Error(`Erro ao buscar as marcas: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data.map(marca => new Marca(marca.nome, marca.codigo));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getModelos(marcaId) {
        try {
            const response = await fetch(`${this.baseURL}/marcas/${marcaId}/modelos`);
            if (!response.ok) {
                throw new Error('Erro ao buscar os modelos.');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAnos(marcaId, modeloId) {
        try {
            const response = await fetch(`${this.baseURL}/marcas/${marcaId}/modelos/${modeloId}/anos`);
            if (!response.ok) {
                throw new Error('Erro ao buscar os anos.');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getValor(marcaId, modeloId, anoId) {
        try {
            const response = await fetch(`${this.baseURL}/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar o valor.');
            }
            const data = await response.json();
            return new Carro(data.Marca, data.Modelo, data.AnoModelo, data.Combustivel, data.Valor);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
