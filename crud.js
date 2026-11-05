const APP_ID = "bK4sla55XOOuyXUTmmhV20M5ySxB7L8qP7DngdrT";
const JS_KEY = "MXcmRrdGUw3Epavwbn0aOeiVAFT9cOD5SuRzenG8";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = "https://parseapi.back4app.com/";

const Recomendacao = Parse.Object.extend("Recomendacoes");

const formulario = document.getElementById("form-recomendacao");
const lista = document.getElementById("lista-recomendacoes");
const mensagem = document.getElementById("mensagem-crud");
const campoId = document.getElementById("recomendacao-id");
const botaoSalvar = document.getElementById("salvar-recomendacao");
const botaoCancelar = document.getElementById("cancelar-edicao");

let recomendacoes = [];

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

async function listarRecomendacoes() {
    try {
        mostrarMensagem("Carregando recomendações...");

        const consulta = new Parse.Query(Recomendacao);
        consulta.descending("createdAt");
        consulta.limit(100);

        recomendacoes = await consulta.find();

        lista.innerHTML = "";

        if (recomendacoes.length === 0) {
            lista.textContent = "Nenhuma recomendação cadastrada ainda.";
        }

        recomendacoes.forEach(recomendacao => {
            const card = document.createElement("article");
            card.className = "card-recomendacao";

            const titulo = document.createElement("h4");
            titulo.textContent = recomendacao.get("nome") || "Sem nome";

            const nota = document.createElement("p");
            nota.textContent = "Nota: " + recomendacao.get("nota") + "/10";

            const status = document.createElement("p");
            status.textContent = "Status: " + recomendacao.get("status");

            const comentario = document.createElement("p");
            comentario.textContent =
                recomendacao.get("comentario") || "Sem comentário.";

            const acoes = document.createElement("div");
            acoes.className = "acoes-recomendacao";

            const editar = document.createElement("button");
            editar.textContent = "Editar";
            editar.className = "btn-editar";
            editar.type = "button";
            editar.addEventListener("click", () => {
                prepararEdicao(recomendacao);
            });

            const excluir = document.createElement("button");
            excluir.textContent = "Excluir";
            excluir.className = "btn-excluir";
            excluir.type = "button";
            excluir.addEventListener("click", () => {
                excluirRecomendacao(recomendacao);
            });

            acoes.append(editar, excluir);
            card.append(titulo, nota, status, comentario, acoes);
            lista.appendChild(card);
        });

        mostrarMensagem("");

    } catch (erro) {
        console.error(erro);
        mostrarMensagem("Erro ao carregar recomendações: " + erro.message);
    }
}


formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome-recomendacao").value.trim();
    const nota = Number(document.getElementById("nota-recomendacao").value);
    const status = document.getElementById("status-recomendacao").value;
    const comentario = document.getElementById("comentario-recomendacao").value.trim();

    if (!nome || !Number.isFinite(nota) || nota < 0 || nota > 10) {
        mostrarMensagem("Preencha o nome e uma nota entre 0 e 10.");
        return;
    }

    try {
        botaoSalvar.disabled = true;

        const id = campoId.value;

        let recomendacao;

        if (id) {
            recomendacao = recomendacoes.find(item => item.id === id);

            if (!recomendacao) {
                throw new Error("Registro não encontrado. Atualize a lista.");
            }
        } else {
            recomendacao = new Recomendacao();
        }

        recomendacao.set("nome", nome);
        recomendacao.set("nota", nota);
        recomendacao.set("status", status);
        recomendacao.set("comentario", comentario);

        await recomendacao.save();

        limparFormulario();
        await listarRecomendacoes();
        mostrarMensagem(id ? "Recomendação atualizada!" : "Recomendação cadastrada!");

    } catch (erro) {
        console.error(erro);
        mostrarMensagem("Erro ao salvar: " + erro.message);
    } finally {
        botaoSalvar.disabled = false;
    }
});


function prepararEdicao(recomendacao) {
    campoId.value = recomendacao.id;

    document.getElementById("nome-recomendacao").value = recomendacao.get("nome");
    document.getElementById("nota-recomendacao").value = recomendacao.get("nota");
    document.getElementById("status-recomendacao").value = recomendacao.get("status");
    document.getElementById("comentario-recomendacao").value = recomendacao.get("comentario") || "";

    botaoSalvar.textContent = "Salvar alterações";
    botaoCancelar.hidden = false;

    formulario.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function excluirRecomendacao(recomendacao) {
    const confirmou = confirm(
        "Deseja realmente excluir " + recomendacao.get("nome") + "?"
    );

    if (!confirmou) return;

    try {
        await recomendacao.destroy();

        if (campoId.value === recomendacao.id) {
            limparFormulario();
        }

        await listarRecomendacoes();
        mostrarMensagem("Recomendação excluída!");

    } catch (erro) {
        console.error(erro);
        mostrarMensagem("Erro ao excluir: " + erro.message);
    }
}


function limparFormulario() {
    formulario.reset();
    campoId.value = "";
    botaoSalvar.textContent = "Salvar recomendação";
    botaoCancelar.hidden = true;
}

botaoCancelar.addEventListener("click", limparFormulario);


listarRecomendacoes();
