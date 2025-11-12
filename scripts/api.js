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

    getMarcasComAtraso() {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const marcas = await this.getMarcas();
                    resolve(marcas);
                } catch (error) {
                    reject(error);
                }
            }, 1500);
        });
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
}