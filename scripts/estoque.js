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
                <img src="../${veiculo.foto}" alt="${veiculo.marca} ${veiculo.modelo}">
                <div class="veiculo-info">
                    <p class="marca">${veiculo.marca}</p>
                    <h3>${veiculo.modelo}</h3>
                    <div class="detalhes">
                        <div class="detalhe-item">
                            <span class="icone">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </span>
                            <p>${veiculo.ano}</p>
                        </div>
                        <div class="detalhe-item">
                            <span class="icone">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="15" y2="22"></line><line x1="4" y1="9" x2="14" y2="9"></line><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"></path><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"></path></svg>
                            </span>
                            <p>${veiculo.combustivel}</p>
                        </div>
                        <div class="detalhe-item">
                            <span class="icone">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path><path d="M16 12l-4-4-4 4"></path><path d="M12 16v-4"></path></svg>
                            </span>
                            <p>${veiculo.km.toLocaleString('pt-BR')} km</p>
                        </div>
                        <div class="detalhe-item">
                            <span class="icone">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"></path></svg>
                            </span>
                            <p>${veiculo.cor}</p>
                        </div>
                    </div>
                    <p class="por-apenas">Por apenas:</p>
                    <p class="preco">R$ ${veiculo.preco.toLocaleString('pt-BR')}</p>
                    <button class="btn-ver">Ver</button>
                </div>
            `;

            estoqueContainer.appendChild(card);
        });

        app.appendChild(estoqueContainer);
    }

    carregarEstoque();
});