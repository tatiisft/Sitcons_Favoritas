const formularioAPI = document.getElementById("form-busca-api");
const campoBuscaAPI = document.getElementById("busca-api");
const resultadosAPI = document.getElementById("resultados-api");
const mensagemAPI = document.getElementById("mensagem-api");

formularioAPI.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const nome = campoBuscaAPI.value.trim();

    if (!nome) {
        mensagemAPI.textContent = "Digite o nome de uma série.";
        return;
    }

    resultadosAPI.replaceChildren();
    mensagemAPI.textContent = "Pesquisando séries...";

    const botao = formularioAPI.querySelector("button");
    botao.disabled = true;

    try {
        const url = "https://api.tvmaze.com/search/shows?q="
            + encodeURIComponent(nome);

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro na consulta à TVmaze.");
        }

        const dados = await resposta.json();

        if (dados.length === 0) {
            mensagemAPI.textContent =
                "Nenhuma série encontrada. Tente outro nome.";
            return;
        }

        mensagemAPI.textContent =
            `${dados.length} resultado(s) encontrado(s).`;

        
        dados.slice(0, 8).forEach(item => {
            criarCardAPI(item.show);
        });

    } catch (erro) {
        console.error(erro);
        mensagemAPI.textContent =
            "Não foi possível consultar a API. Tente novamente.";
    } finally {
        botao.disabled = false;
    }
});



function criarCardAPI(serie) {

    const card = document.createElement("article");
    card.className = "card-api";

    
    if (serie.image && serie.image.medium) {
        const imagem = document.createElement("img");
        imagem.src = serie.image.medium;
        imagem.alt = "Pôster de " + serie.name;
        imagem.loading = "lazy";
        card.appendChild(imagem);
    }

    const conteudo = document.createElement("div");
    conteudo.className = "conteudo-card-api";

    const titulo = document.createElement("h3");
    titulo.textContent = serie.name || "Sem título";

    const generos = document.createElement("p");
    generos.textContent = "Gêneros: " +
        (serie.genres && serie.genres.length
            ? serie.genres.join(", ")
            : "Não informado");

    const nota = document.createElement("p");
    nota.textContent = "Avaliação: " +
        (serie.rating && serie.rating.average != null
            ? serie.rating.average + "/10"
            : "Não informada");

    const situacao = document.createElement("p");
    situacao.textContent = "Situação: " +
        (serie.status || "Não informada");

    const sinopse = document.createElement("p");

    if (serie.summary) {
        
        const documento = new DOMParser()
            .parseFromString(serie.summary, "text/html");

        const texto = documento.body.textContent || "";
        sinopse.textContent = texto.length > 240
            ? texto.slice(0, 240) + "..."
            : texto;
    } else {
        sinopse.textContent = "Sinopse não disponível.";
    }

    conteudo.append(titulo, generos, nota, situacao, sinopse);

   
    if (serie.url && serie.url.startsWith("https://www.tvmaze.com/")) {
        const link = document.createElement("a");
        link.href = serie.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Ver mais na TVmaze";
        conteudo.appendChild(link);
    }

    card.appendChild(conteudo);
    resultadosAPI.appendChild(card);
}
