# Roteiro de Apresentação

Este roteiro foi criado para guiar a apresentação do projeto, cobrindo todos os pontos de avaliação solicitados.

## 1. Demonstração Funcional da Aplicação (5 min)

- **Passo 1: Abrir `index.html`**
  - Apresentar a página inicial.

- **Passo 2: Navegar para "Consultar Veículos" (`pages/consulta.html`)**
  - Explicar o objetivo desta página: consultar o valor de um veículo na tabela FIPE.

- **Passo 3: Realizar uma consulta completa**
  - Selecionar uma marca (ex: Fiat).
  - Selecionar um modelo (ex: Palio).
  - Selecionar um ano.
  - Clicar em "Consultar".
  - Mostrar o resultado aparecendo na tela.

- **Passo 4: Navegar para "Veículos em Estoque" (`pages/estoque.html`)**
  - Explicar que esta página carrega dados de um arquivo JSON local (`data/estoque.json`).
  - Mostrar os cards dos veículos em estoque.

## 2. Explicação da Comunicação com a API (Foco: `scripts/api.js`)

### a. Como as requisições são feitas e o uso de `fetch` com `async/await`

- **Ponto a explicar:** As requisições para a API FIPE são centralizadas no arquivo `scripts/api.js`.
- **Exemplo no código (`getMarcas`, `getModelos`, `getAnos`, `getValor`):

```javascript
// Exemplo da função getMarcas em scripts/api.js
async getMarcas() {
    try {
        const response = await fetch(`${this.baseUrl}/carros/marcas`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.map(marca => new Marca(marca.codigo, marca.nome));
    } catch (error) {
        console.error('Falha ao buscar marcas:', error);
        throw error;
    }
}
```

- **Roteiro de explicação:**
  1.  **`async getMarcas()`**: A função é declarada como `async` para permitir o uso do `await` dentro dela. Isso torna o código assíncrono mais legível, parecendo síncrono.
  2.  **`const response = await fetch(...)`**: O `fetch` é a API do navegador para fazer requisições de rede. Ele retorna uma `Promise`. O `await` pausa a execução da função `getMarcas` até que a `Promise` do `fetch` seja resolvida (ou seja, até que o servidor responda).
  3.  **`const data = await response.json()`**: O método `.json()` do objeto `response` também retorna uma `Promise`. O `await` novamente pausa a execução até que o corpo da resposta seja completamente lido e convertido de JSON para um objeto JavaScript.

### b. Tratamento de Respostas e Erros

- **Ponto a explicar:** O tratamento de erros é feito usando um bloco `try...catch` em todas as funções que fazem requisições.
- **Exemplo no código (`getMarcas`):

```javascript
// Dentro de getMarcas em scripts/api.js
try {
    // ... fetch ...
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // ... response.json() ...
} catch (error) {
    console.error('Falha ao buscar marcas:', error);
    throw error; // Re-lança o erro para quem chamou a função
}
```

- **Roteiro de explicação:**
  1.  **`try {...}`**: O código que pode falhar (a requisição de rede) é colocado dentro do bloco `try`.
  2.  **`if (!response.ok)`**: O `fetch` não considera erros de HTTP (como 404 ou 500) como uma falha de `Promise`. Por isso, verificamos manualmente a propriedade `response.ok`. Se for `false`, significa que a requisição falhou, e nós lançamos um erro (`throw new Error(...)`) para que ele seja capturado pelo `catch`.
  3.  **`catch (error) {...}`**: Se qualquer coisa dentro do `try` falhar (seja a rede caindo ou o `throw` que criamos), a execução pula para o bloco `catch`. Aqui, o erro é registrado no console (`console.error`) e depois relançado (`throw error`). Isso é importante para que a função que chamou `getMarcas` (por exemplo, em `scripts/consulta.js`) também saiba que algo deu errado e possa tratar o erro (ex: mostrando uma mensagem para o usuário).

### c. Diferenças entre Promises e async/await no seu código

- **Ponto a explicar:** `async/await` é uma "syntactic sugar" (uma sintaxe mais limpa) para trabalhar com `Promises`. O código ainda usa `Promises` por baixo dos panos, mas a escrita fica mais direta.
- **Como era antes (com `.then()`):**

```javascript
// Exemplo hipotético com .then()
function getMarcasThen() {
    fetch(`${this.baseUrl}/carros/marcas`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // faz algo com os dados
        })
        .catch(error => {
            console.error('Falha ao buscar marcas:', error);
        });
}
```

- **Como está agora (com `async/await`):**

```javascript
// Como está em scripts/api.js
async getMarcas() {
    try {
        const response = await fetch(`${this.baseUrl}/carros/marcas`);
        // ... resto do código
    } catch (error) {
        // ... tratamento de erro
    }
}
```

- **Roteiro de explicação:**
  - Mostre os dois exemplos. Explique que o resultado é o mesmo, mas a versão com `async/await` evita o aninhamento de `.then()` (conhecido como "Promise hell" ou "pyramid of doom") e torna o fluxo de controle mais fácil de seguir, especialmente quando há múltiplas etapas assíncronas. O tratamento de erros com `try...catch` também é mais familiar para quem vem de linguagens síncronas.

## 3. Tratamento de Objetos (Foco: `scripts/models.js`, `scripts/api.js`, `scripts/consulta.js`)

### a. Como os dados da API são transformados em objetos

- **Ponto a explicar:** Os dados brutos (JSON) que vêm da API são usados para criar instâncias de objetos customizados (`Marca`, `Carro`), padronizando a estrutura de dados da aplicação.
- **Exemplo no código (`getValor` em `scripts/api.js`):

```javascript
// Em scripts/api.js
async getValor(marcaId, modeloId, anoId) {
    try {
        // ... fetch ...
        const data = await response.json();
        // Aqui acontece a transformação!
        return new Carro(data.Marca, data.Modelo, data.AnoModelo, data.Combustivel, data.Valor);
    } catch (error) {
        // ...
    }
}
```

- **Roteiro de explicação:**
  1.  A função `getValor` recebe os dados da API, que são um objeto JSON com chaves como `Marca`, `Modelo`, `AnoModelo` (com a primeira letra maiúscula).
  2.  Em vez de usar esse objeto diretamente, usamos `new Carro(...)` para criar uma nova instância do nosso objeto `Carro`.
  3.  Isso "traduz" os dados da API para o nosso modelo de dados. Por exemplo, o `data.Marca` da API vira a propriedade `this.marca` (minúsculo) no nosso objeto `Carro`. Isso nos dá controle e consistência sobre como os dados são estruturados na aplicação.

### b. Uso de Funções Construtoras e Protótipos (Herança)

- **Ponto a explicar:** O projeto utiliza funções construtoras para definir "classes" (`Veiculo`, `Carro`) e protótipos para implementar herança e compartilhar métodos, economizando memória.

- **Exemplo no código (`scripts/models.js`):

```javascript
// Função construtora PAI
function Veiculo(marca, modelo, ano) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
}

// Método no protótipo do PAI
Veiculo.prototype.getDescricao = function () {
    return `${this.marca} ${this.modelo} (${this.ano})`;
};

// Função construtora FILHA
function Carro(marca, modelo, ano, combustivel, valor) {
    // 1. Atribuição manual das propriedades herdadas
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    
    // Propriedades específicas de Carro
    this.combustivel = combustivel || 'Flex';
    this.valor = valor;
}

// 2. Define a cadeia de protótipos para herança
Carro.prototype = Object.create(Veiculo.prototype);

// 3. Corrige o construtor do protótipo
Carro.prototype.constructor = Carro;

// 4. Polimorfismo: Sobrescreve o método do PAI
Carro.prototype.getDescricao = function () {
    // Recria a descrição base e adiciona a informação específica
    const descricaoBase = `${this.marca} ${this.modelo} (${this.ano})`;
    return `${descricaoBase} - ${this.combustivel}`;
};
```

- **Roteiro de explicação:**
  1.  **Funções Construtoras (`Veiculo`, `Carro`):** São os moldes para nossos objetos. `Veiculo` é a classe base, mais genérica. `Carro` é uma especialização de `Veiculo`.
  2.  **Atribuição de Propriedades:** Dentro do construtor `Carro`, as propriedades da classe pai (`marca`, `modelo`, `ano`) são atribuídas diretamente. Como o método `call` não foi utilizado, repetimos essa atribuição para garantir que o objeto `Carro` tenha todas as propriedades necessárias.
  3.  **Herança com `Object.create(Veiculo.prototype)`:** Esta é a linha chave que estabelece a herança de *métodos*. Ela cria um novo objeto para ser o protótipo de `Carro`, e esse novo objeto tem o protótipo de `Veiculo` como seu próprio protótipo. Assim, instâncias de `Carro` terão acesso aos métodos de `Veiculo.prototype`.
  4.  **Polimorfismo com `Carro.prototype.getDescricao`:** `Carro` define sua própria versão de `getDescricao`. Isso é polimorfismo. Como não estamos usando `call` para invocar o método do pai, a função recria a descrição base e depois adiciona a informação específica de `Carro` (o combustível).

### c. Manipulação e Processamento dos Objetos

- **Ponto a explicar:** Uma vez que os objetos são criados, podemos usar seus métodos para obter informações formatadas e manipular os dados de forma encapsulada.
- **Exemplo no código (`scripts/consulta.js`):

```javascript
// Em scripts/consulta.js, dentro do event listener do formulário
const veiculo = await api.getValor(marcaId, modeloId, anoId);

// Usando o método do objeto para encapsulamento
const descricao = veiculo.getDescricao();

resultadoDiv.innerHTML = `
    <h3>${descricao}</h3>
    <p>Valor: <strong>${veiculo.valor}</strong></p>
`;
```

- **Roteiro de explicação:**
  1.  Depois que `api.getValor` retorna uma instância de `Carro`, nós a armazenamos na variável `veiculo`.
  2.  Em vez de acessar cada propriedade individualmente para montar a descrição (`veiculo.marca`, `veiculo.modelo`...), nós simplesmente chamamos o método `veiculo.getDescricao()`.
  3.  **Vantagens:** Isso é encapsulamento. A lógica de como a descrição é formatada fica *dentro* do objeto `Carro`, e não espalhada pelo código que o utiliza. Se um dia a regra de formatação mudar (ex: `Modelo - Marca (Ano)`), só precisamos alterar o método `getDescricao` em `scripts/models.js`, e todo o resto do código que usa esse método funcionará automaticamente, sem precisar de alterações.

## 4. Perguntas do professor sobre decisões técnicas e conceitos aplicados

Esta seção serve como um guia para as perguntas mais prováveis.

### a. Por que escolheu essa API (Tabela FIPE)?

- **Resposta Sugerida:**
  - "Escolhi a API da Tabela FIPE por ser um serviço público, gratuito e de fácil acesso, que não exige chaves de autenticação complexas para consultas básicas. Isso permitiu focar nos requisitos do trabalho, como o tratamento de requisições, `async/await` e a manipulação de objetos, sem me preocupar com a complexidade de autenticação OAuth, por exemplo."
  - "Além disso, a estrutura de dados da API é bem definida (marcas -> modelos -> anos -> valor), o que se encaixou bem no exercício de fazer requisições encadeadas e transformar os dados em um modelo de objetos com herança."

### b. Como você estruturou seus objetos? Por que usar Herança?

- **Resposta Sugerida:**
  - "Eu estruturei os objetos em `scripts/models.js` usando uma classe base `Veiculo` e uma classe derivada `Carro`. A `Marca` também foi modelada como um objeto simples."
  - "A classe `Veiculo` contém atributos e métodos comuns a qualquer tipo de veículo, como `marca`, `modelo`, `ano` e o método `getDescricao()`. A classe `Carro` herda de `Veiculo` e adiciona propriedades específicas de um carro, como `combustivel` and `valor`."
  - "A decisão de usar herança foi para atender aos requisitos do trabalho e para demonstrar um conceito fundamental de Orientação a Objetos. Isso permite o reuso de código (o construtor e o `getDescricao` de `Veiculo` são reaproveitados por `Carro`) e cria um modelo de dados mais organizado e extensível. Se no futuro precisássemos adicionar `Moto` ou `Caminhao`, poderíamos fazer com que eles também herdassem de `Veiculo`, reaproveitando a estrutura base."

### c. Como tratou erros nas requisições?

- **Resposta Sugerida:**
  - "Conforme mostrado na seção 2, todo o tratamento de erro nas requisições em `scripts/api.js` é feito com blocos `try...catch` em conjunto com `async/await`."
  - "Dentro do `try`, após cada `fetch`, eu verifico a propriedade `response.ok`. Se ela for `false`, significa que a requisição teve um problema de status HTTP (como 404 ou 500). Nesse caso, eu lanço um novo erro (`throw new Error(...)`) para que ele seja capturado pelo bloco `catch`."
  - "No `catch`, o erro é logado no console para fins de depuração e, crucialmente, ele é relançado (`throw error`). Isso permite que o código que chamou a função da API (em `scripts/consulta.js`, por exemplo) também receba o erro e possa tomar uma ação, como exibir uma mensagem amigável para o usuário, em vez de apenas quebrar a aplicação."

### d. Diferenças entre Promises e async/await no seu código

- **Resposta Sugerida:**
  - "No meu código, eu utilizei `async/await` em todas as funções de comunicação com a API. `async/await` é uma sintaxe mais moderna e legível para lidar com código assíncrono, que por baixo dos panos ainda utiliza `Promises`."
  - "A principal vantagem é a clareza. Em vez de encadear múltiplos `.then()` e ter um `.catch()` no final, eu posso escrever o código como se fosse síncrono, usando `await` para pausar a execução até que a `Promise` seja resolvida. O tratamento de erros também fica mais intuitivo, usando o `try...catch` padrão do JavaScript, que é mais fácil de ler e gerenciar do que as cadeias de `.catch()` das `Promises`."

### e. Como implementou herança/protótipos?

- **Resposta Sugerida:**
  - "A implementação da herança está no arquivo `scripts/models.js` e segue o padrão clássico de protótipos do JavaScript (ES5)."
  - "**Passo 1: Inicialização das Propriedades:** Dentro da função construtora `Carro`, as propriedades herdadas de `Veiculo` (`marca`, `modelo`, `ano`) são inicializadas manualmente. Isso foi feito para evitar o uso do método `.call()`, tornando o código mais direto, embora com alguma repetição."
  - "**Passo 2: Ligação dos Protótipos:** A linha `Carro.prototype = Object.create(Veiculo.prototype);` é o coração da herança de métodos. Ela cria um novo objeto, cujo protótipo é `Veiculo.prototype`, e o atribui a `Carro.prototype`. Isso significa que qualquer instância de `Carro` irá procurar métodos não encontrados em seu próprio protótipo no protótipo de `Veiculo`, estabelecendo a cadeia de protótipos."
  - "**Passo 3: Correção do Construtor:** Após ligar os protótipos, a propriedade `constructor` de `Carro.prototype` passa a apontar para `Veiculo`. Eu corrijo isso manualmente com `Carro.prototype.constructor = Carro;` para manter a consistência."
  - "**Passo 4: Polimorfismo:** Eu também demonstro polimorfismo sobrescrevendo o método `getDescricao` no protótipo de `Carro`. A nova versão do método cria a descrição base e adiciona as informações específicas do `Carro`, como o combustível, sem chamar a versão do método pai."
