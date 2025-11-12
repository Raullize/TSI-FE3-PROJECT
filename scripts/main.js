document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const api = new FipeAPI();

    function renderizarMarcas(marcas) {
        app.innerHTML = '';
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
        app.innerHTML = '';

        api.getMarcasComAtraso()
            .then(marcas => {
                renderizarMarcas(marcas);
            })
            .catch(error => {
                app.innerHTML = `<p>Erro ao carregar as marcas: ${error.message}</p>`;
            });
    }

    async function carregarModelos(marcaId) {
        app.innerHTML = '';

        try {
            const data = await api.getModelos(marcaId);
            const ul = document.createElement('ul');
            data.modelos.forEach(modelo => {
                const li = document.createElement('li');
                li.textContent = modelo.nome;
                ul.appendChild(li);
            });
            app.appendChild(ul);
        } catch (error) {
            app.innerHTML = '<p>Erro ao carregar os modelos. Tente novamente mais tarde.</p>';
        }

        const backButton = document.createElement('button');
        backButton.textContent = 'Voltar';
        backButton.addEventListener('click', carregarMarcas);
        app.prepend(backButton);
    }

    carregarMarcas();
});