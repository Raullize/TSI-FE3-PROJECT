document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    function carregarEstoque() {
        fetch('../data/estoque.json')
            .then(response => response.json())
            .then(data => {
                renderizarEstoque(data);
            })
            .catch(error => {
                app.innerHTML = '<p>Erro ao carregar o estoque. Tente novamente mais tarde.</p>';
                console.error('Erro ao buscar o estoque:', error);
            });
    }

    function renderizarEstoque(estoque) {
        const estoqueContainer = document.createElement('div');
        estoqueContainer.className = 'estoque-container';

        estoque.forEach(veiculo => {
            const card = document.createElement('div');
            card.className = 'veiculo-card';

            card.innerHTML = `
                <img src="${veiculo.foto}" alt="${veiculo.marca} ${veiculo.modelo}">
                <h3>${veiculo.marca} ${veiculo.modelo}</h3>
                <p>Ano: ${veiculo.ano}</p>
                <p>Cor: ${veiculo.cor}</p>
                <p>KM: ${veiculo.km.toLocaleString('pt-BR')}</p>
                <p class="preco">R$ ${veiculo.preco.toLocaleString('pt-BR')}</p>
            `;

            estoqueContainer.appendChild(card);
        });

        app.appendChild(estoqueContainer);
    }

    carregarEstoque();
});