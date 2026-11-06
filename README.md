# 🎭 Séries de Comédia

Site desenvolvido originalmente para apresentar algumas das minhas sitcoms favoritas, explorando suas histórias, personagens, curiosidades e avaliações pessoais.

O projeto original foi **utilizado como base para a atividade A02 — Dashboard com HTML, CSS e JS**, sendo ampliado e aprimorado em equipe. Mantivemos as páginas e funcionalidades já existentes e acrescentamos um dashboard com dados reais, filtros interativos, integração com back-end e consumo de uma API pública.

## 🌐 Acesse o Projeto

**Site publicado (Vercel):**  
https://sitconsfavoritas.vercel.app/

**Repositório GitHub:**  
https://github.com/tatiisft/Sitcons_Favoritas

**Publicação original (GitHub Pages):**  
https://tatiisft.github.io/Sitcons_Favoritas/

## 📺 Séries Apresentadas

- Friends
- Brooklyn Nine-Nine
- How I Met Your Mother
- The Office

Cada série possui uma página com informações sobre história, personagens e curiosidades, além de uma página dedicada ao trailer.

## ✨ Funcionalidades do Projeto Original

- Navegação entre páginas utilizando HTML
- Scroll suave implementado com JavaScript
- Cards interativos para acesso às páginas das séries
- Página exclusiva para trailer de cada série
- Formulário de contato integrado ao WhatsApp
- Design responsivo utilizando CSS

## 🚀 Evolução do Projeto para a A02

Para a atividade **A02 — Dashboard com HTML, CSS e JS**, o site foi aprimorado com a participação de dois novos colaboradores, preservando a proposta e a identidade visual do projeto original.

### 📊 Dashboard com dados reais

Utilizamos o dataset **Top 50 Sitcoms**, disponível no Kaggle, para analisar 50 registros de séries de comédia. Os dados foram disponibilizados no projeto em `sitcoms.json` e carregados pelo JavaScript com `fetch()`.

Com **Chart.js**, criamos cinco gráficos:

1. Quantidade de séries por década de estreia — barras;
2. Top 10 séries mais bem avaliadas — barras horizontais;
3. Nota média por década — linha;
4. Distribuição do gênero principal — pizza;
5. Gêneros mais frequentes — barras horizontais.

O dashboard também apresenta indicadores gerais, como quantidade de séries, nota média e número de gêneros diferentes.

**Fonte dos dados:** https://www.kaggle.com/datasets/agarwalyashhh/top-50-sitcoms

> As avaliações refletem o conjunto de dados utilizado, e não uma classificação atualizada em tempo real. Uma série pode pertencer a mais de um gênero; o dataset também inclui versões distintas de *The Office*.

### 🔎 Interatividade com JavaScript

A página permite pesquisar uma sitcom pelo nome, filtrar por década de estreia e por gênero, além de limpar os filtros. Utilizamos métodos do JavaScript, como `filter()`, para selecionar os registros e atualizar os indicadores e os gráficos conforme a pesquisa do visitante.

### 🍿 CRUD com Back4App

A seção **Minha Lista de Sitcoms** permite cadastrar, visualizar, editar e excluir recomendações, informando nome, nota pessoal, status e comentário. Os registros são armazenados no **Back4App**, com integração ao back-end por meio do **Parse JavaScript SDK** e de sua API.

> A lista é uma funcionalidade demonstrativa. Para disponibilização pública sem restrições, as permissões do banco devem ser revisadas e o acesso protegido adequadamente.

### 🌐 Integração com API pública

A seção **Descubra Mais Séries** consulta a **API TVmaze** pelo JavaScript, exibindo informações externas sobre séries, como título, pôster, gêneros, avaliação, situação e sinopse, quando disponíveis.

**API:** https://www.tvmaze.com/api

## 🛠️ Tecnologias Utilizadas

- **HTML5:** estrutura das páginas e dos componentes;
- **CSS3:** estilo visual e adaptação para celular e desktop;
- **JavaScript:** navegação, filtros, manipulação dos dados e requisições externas;
- **Chart.js:** construção dos gráficos do dashboard;
- **JSON:** armazenamento local dos dados do Kaggle usados nos gráficos;
- **Back4App / Parse:** persistência das operações de CRUD;
- **TVmaze API:** consulta de informações de outras séries;
- **Git e GitHub:** versionamento e colaboração;
- **GitHub Pages:** publicação da versão original;
- **Vercel:** publicação da versão aprimorada para a A02.

## ▶️ Como Executar Localmente

1. Clone ou baixe este repositório.
2. Abra no VS Code a pasta que contém `index.html`.
3. Execute a página usando **Live Server** ou outro servidor HTTP local.
4. Navegue pelo site e acesse o dashboard pelo menu.
5. Mantenha conexão com a internet para carregar as bibliotecas externas e acessar Back4App e TVmaze.

> A leitura de `sitcoms.json` usa `fetch()`, portanto abrir o HTML diretamente com `file://` pode impedir o carregamento dos dados.

## 🎓 Contexto Acadêmico

O site foi **desenvolvido inicialmente como atividade da disciplina de Desenvolvimento Web**, aplicando conceitos de HTML, CSS, JavaScript, navegação entre páginas e publicação de sites.

Posteriormente, o projeto foi **aproveitado como base e ampliado em equipe para a atividade A02 — Dashboard com HTML, CSS e JS**, com o objetivo de construir gráficos a partir de dados reais, implementar interatividade, integrar um CRUD a um back-end, consumir uma API pública e publicar a solução.

## 👩‍💻 Autoria do Projeto Original

- Tatiana Maria dos Santos Freitas

## 👥 Equipe da A02

- Maria Letícia Araújo Queiroz Lacerda
- Vitor Gabriel da Costa Luna
- Tatiana Maria dos Santos Freitas 
