# AutoHub - Vitrine e Consulta de Veículos

**Integrantes:** Raul Lize e Miguel Leonardo

## Descrição do Projeto

AutoHub é uma aplicação web desenvolvida para aplicar conceitos de Programação Orientada a Objetos (POO) em JavaScript e consumo de APIs externas. A aplicação simula a vitrine de uma concessionária de veículos, permitindo aos usuários visualizar um estoque simulado e consultar preços de referência atualizados pela Tabela FIPE.

## API Utilizada

**API da Tabela FIPE (Parallelum)**
- **URL:** `https://parallelum.com.br/fipe/api/v1/carros`
- **Justificativa:** Escolhida por ser uma API pública, gratuita e estável, que fornece dados reais e relevantes para o contexto automotivo brasileiro. A estrutura hierárquica (Marca -> Modelo -> Ano -> Valor) é ideal para demonstrar o tratamento de dados encadeados e chamadas assíncronas dependentes.

## Tecnologias Utilizadas

- **HTML5:** Estrutura semântica.
- **CSS3:** Estilização.
- **JavaScript (ES6+):** Lógica da aplicação, POO e Assincronismo.

## Instruções de Uso

1. Clone este repositório ou baixe os arquivos.
2. Abra o arquivo `index.html` em seu navegador de preferência.
3. **Navegação:**
   - **Estoque:** Visualize os carros disponíveis na loja (dados do arquivo `data/estoque.json`).
   - **Consulta FIPE:** Realize consultas de preço em tempo real selecionando Marca, Modelo e Ano.

## Estrutura de Pastas

- `data/`: Arquivos JSON locais.
- `pages/`: Páginas HTML secundárias.
- `scripts/`: Arquivos JavaScript modularizados.
- `styles/`: Folhas de estilo CSS.
- `images/`: Recursos de imagem.
