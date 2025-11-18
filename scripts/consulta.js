document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const api = new FipeAPI();

    function renderizarMarcas(marcas) {
        app.innerHTML = '<h2>Consulta de Preços - Tabela FIPE</h2>';
        const ul = document.createElement('ul');
        marcas.forEach(marca => {
            const li = document.createElement('li');
            li.textContent = marca.nome;
            li.dataset.id = marca.valor;
            li.addEventListener('click', () => carregarModelos(marca.valor));
            ul.appendChild(li);
        });
        app.appendChild(ul);
    }

    function carregarMarcas() {
        app.innerHTML = '<p>Carregando marcas...</p>';
        api.getMarcas()
            .then(marcas => {
                renderizarMarcas(marcas);
            })
            .catch(error => {
                app.innerHTML = `<p>Erro ao carregar as marcas: ${error.message}</p>`;
            });
    }

    async function carregarModelos(marcaId) {
        app.innerHTML = '<p>Carregando modelos...</p>';
        try {
            const data = await api.getModelos(marcaId);
            app.innerHTML = '';
            const ul = document.createElement('ul');
            data.modelos.forEach(modelo => {
                const li = document.createElement('li');
                li.textContent = modelo.nome;
                li.dataset.id = modelo.codigo;
                li.addEventListener('click', () => carregarAnos(marcaId, modelo.codigo));
                ul.appendChild(li);
            });
            app.appendChild(ul);

            const backButton = document.createElement('button');
            backButton.textContent = 'Voltar para Marcas';
            backButton.addEventListener('click', carregarMarcas);
            app.prepend(backButton);

        } catch (error) {
            app.innerHTML = '<p>Erro ao carregar os modelos. Tente novamente mais tarde.</p>';
        }
    }

    async function carregarValor(marcaId, modeloId, anoId) {
        app.innerHTML = '<p>Carregando valor...</p>';
        try {
            const veiculo = await api.getValor(marcaId, modeloId, anoId);
            app.innerHTML = `
                <h2>Resultado da Consulta</h2>
                <div class="valor-resultado">
                    <p><strong>Marca:</strong> ${veiculo.Marca}</p>
                    <p><strong>Modelo:</strong> ${veiculo.Modelo}</p>
                    <p><strong>Ano:</strong> ${veiculo.AnoModelo}</p>
                    <h3>Valor FIPE: ${veiculo.Valor}</h3>
                </div>
            `;

            const backButton = document.createElement('button');
            backButton.textContent = 'Voltar para Anos';
            backButton.addEventListener('click', () => carregarAnos(marcaId, modeloId));
            app.prepend(backButton);

        } catch (error) {
            app.innerHTML = '<p>Erro ao carregar o valor. Tente novamente mais tarde.</p>';
        }
    }

    async function carregarAnos(marcaId, modeloId) {
        app.innerHTML = '<p>Carregando anos...</p>';
        try {
            const anos = await api.getAnos(marcaId, modeloId);
            app.innerHTML = '';
            const ul = document.createElement('ul');
            anos.forEach(ano => {
                const li = document.createElement('li');
                li.textContent = ano.nome;
                li.dataset.id = ano.codigo;
                li.addEventListener('click', () => carregarValor(marcaId, modeloId, ano.codigo));
                ul.appendChild(li);
            });
            app.appendChild(ul);

            const backButton = document.createElement('button');
            backButton.textContent = 'Voltar para Modelos';
            backButton.addEventListener('click', () => carregarModelos(marcaId));
            app.prepend(backButton);

        } catch (error) {
            app.innerHTML = '<p>Erro ao carregar os anos. Tente novamente mais tarde.</p>';
        }
    }

    carregarMarcas();
});