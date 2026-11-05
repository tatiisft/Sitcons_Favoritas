const cores = [
    "#f28c28", "#1f3c68", "#f4c542", "#55a6a6",
    "#a87bc7", "#e66b6b", "#5b8bd9", "#77b96b",
    "#c87951", "#8b8b8b", "#de94b6"
];

let todasSeries = [];

async function iniciarDashboard() {
    try {
        const resposta = await fetch("sitcoms.json");
        if (!resposta.ok) throw new Error("Não foi possível carregar sitcoms.json");

        const dados = await resposta.json();
        const series = dados.filter(s =>
            s.sitcoms_names &&
            Number.isFinite(Number(s.start)) &&
            Number.isFinite(Number(s.Ratings)) &&
            String(s.Genre || "").trim()
        );

        if (series.length === 0) throw new Error("O JSON não contém registros válidos.");


        todasSeries = series;

        preencherOpcoesFiltros();
        document.getElementById("busca-serie").addEventListener("input", aplicarFiltros);
        document.getElementById("filtro-decada").addEventListener("change", aplicarFiltros);
        document.getElementById("filtro-genero").addEventListener("change", aplicarFiltros);
        document.getElementById("limpar-filtros").addEventListener("click", limparFiltros);
        aplicarFiltros();

    } catch (erro) {
        console.error(erro);
        document.getElementById("mensagem-erro").textContent = "Erro ao carregar os gráficos.";
    }
}


function decada(ano) {
    return Math.floor(Number(ano) / 10) * 10;
}


function generosDaSerie(serie) {
    return String(serie.Genre).split(",").map(g => g.trim()).filter(Boolean);
}


function media(valores) {
    return valores.reduce((soma, valor) => soma + Number(valor), 0) / valores.length;
}

function mostrarIndicadores(series) {
    const generos = new Set(series.flatMap(generosDaSerie));

    document.getElementById("total-series").textContent = series.length;
    document.getElementById("nota-media").textContent =
        media(series.map(s => s.Ratings)).toFixed(2).replace(".", ",");
    document.getElementById("total-generos").textContent = generos.size;
}


function graficoDecadas(series) {
    const contagem = {};
    series.forEach(s => {
        const d = decada(s.start);
        contagem[d] = (contagem[d] || 0) + 1;
    });
    const decadas = Object.keys(contagem).sort((a, b) => a - b);

    new Chart(document.getElementById("grafico-decadas"), {
        type: "bar",
        data: {
            labels: decadas.map(d => `${d}s`),
            datasets: [{
                label: "Número de séries",
                data: decadas.map(d => contagem[d]),
                backgroundColor: cores[0],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { title: { display: true, text: "Década de estreia" } },
                y: {
                    beginAtZero: true,
                    title: { display: true, text: "Quantidade de séries" },
                    ticks: { precision: 0 }
                }
            }
        }
    });
}


function graficoTop10(series) {
    const top10 = [...series].sort((a, b) => Number(b.Ratings) - Number(a.Ratings)).slice(0, 10);
    const nomes = top10.map(s =>
        s.sitcoms_names === "The Office"
            ? `${s.sitcoms_names} (${s.start})`
            : s.sitcoms_names
    );

    new Chart(document.getElementById("grafico-top10"), {
        type: "bar",
        data: {
            labels: nomes,
            datasets: [{
                label: "Nota (0 a 10)",
                data: top10.map(s => Number(s.Ratings)),
                backgroundColor: cores[1],
                borderRadius: 5
            }]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 10,
                    title: { display: true, text: "Nota (0 a 10)" }
                },
                y: { title: { display: true, text: "Sitcom" } }
            }
        }
    });
}


function graficoMedias(series) {
    const grupos = {};
    series.forEach(s => {
        const d = decada(s.start);
        if (!grupos[d]) grupos[d] = [];
        grupos[d].push(Number(s.Ratings));
    });
    const decadas = Object.keys(grupos).sort((a, b) => a - b);

    new Chart(document.getElementById("grafico-medias"), {
        type: "line",
        data: {
            labels: decadas.map(d => `${d}s`),
            datasets: [{
                label: "Nota média (0 a 10)",
                data: decadas.map(d => Number(media(grupos[d]).toFixed(2))),
                borderColor: cores[0],
                backgroundColor: cores[0],
                tension: 0.25
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: "Década de estreia" } },
                y: {
                    min: 0,
                    max: 10,
                    title: { display: true, text: "Nota média (0 a 10)" }
                }
            }
        }
    });
}


function graficoPrincipal(series) {
    const contagem = {};
    series.forEach(s => {
        const genero = generosDaSerie(s)[0];
        if (genero) contagem[genero] = (contagem[genero] || 0) + 1;
    });
    const nomes = Object.keys(contagem).sort((a, b) => contagem[b] - contagem[a]);

    new Chart(document.getElementById("grafico-principal"), {
        type: "pie",
        data: {
            labels: nomes,
            datasets: [{
                label: "Séries",
                data: nomes.map(g => contagem[g]),
                backgroundColor: nomes.map((_, i) => cores[i % cores.length])
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "bottom" },
                tooltip: {
                    callbacks: {
                        label: contexto => {
                            const qtd = contexto.raw;
                            const percentual = (qtd / series.length * 100).toFixed(1).replace(".", ",");
                            return `${contexto.label}: ${qtd} séries (${percentual}%)`;
                        }
                    }
                }
            }
        }
    });
}


function graficoGeneros(series) {
    const contagem = {};
    series.forEach(s => {
        generosDaSerie(s).forEach(g => {
            contagem[g] = (contagem[g] || 0) + 1;
        });
    });
    const nomes = Object.keys(contagem).sort((a, b) => contagem[b] - contagem[a]);

    new Chart(document.getElementById("grafico-generos"), {
        type: "bar",
        data: {
            labels: nomes,
            datasets: [{
                label: "Número de séries",
                data: nomes.map(g => contagem[g]),
                backgroundColor: cores[0],
                borderRadius: 5
            }]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    beginAtZero: true,
                    title: { display: true, text: "Quantidade de séries" },
                    ticks: { precision: 0 }
                },
                y: { title: { display: true, text: "Gênero" } }
            }
        }
    });
}




function preencherOpcoesFiltros() {

    const selectDecada = document.getElementById("filtro-decada");
    const selectGenero = document.getElementById("filtro-genero");

    const decadas = [...new Set(todasSeries.map(serie => decada(serie.start)))].sort((a, b) => a - b);

    decadas.forEach(ano => {
        const opcao = document.createElement("option");
        opcao.value = ano;
        opcao.textContent = `Anos ${ano}`;
        selectDecada.appendChild(opcao);
    });

    const generos = [...new Set(todasSeries.flatMap(generosDaSerie))].sort();

    generos.forEach(genero => {
        const opcao = document.createElement("option");
        opcao.value = genero;
        opcao.textContent = genero;
        selectGenero.appendChild(opcao);
    });
}



function aplicarFiltros() {

    const busca = document.getElementById("busca-serie").value.trim().toLowerCase();

    const decadaEscolhida = document.getElementById("filtro-decada").value;

    const generoEscolhido = document.getElementById("filtro-genero").value;

    const seriesFiltradas = todasSeries.filter(serie => {

        const correspondeNome = serie.sitcoms_names.toLowerCase().includes(busca);

        const correspondeDecada = decadaEscolhida === "todas" || decada(serie.start) === Number(decadaEscolhida);
        const correspondeGenero = generoEscolhido === "todos" || generosDaSerie(serie).includes(generoEscolhido);

        return correspondeNome && correspondeDecada && correspondeGenero;
    });

    
    document.getElementById("resultado-filtros").textContent = `${seriesFiltradas.length} de ${todasSeries.length} séries encontradas`;

    
    const idsGraficos = [
        "grafico-decadas",
        "grafico-top10",
        "grafico-medias",
        "grafico-principal",
        "grafico-generos"
    ];

    idsGraficos.forEach(id => {
        const graficoExistente = Chart.getChart(id);

        if (graficoExistente) {
            graficoExistente.destroy();
        }
    });

    
    if (seriesFiltradas.length === 0) {
        document.getElementById("total-series").textContent = "0";
        document.getElementById("nota-media").textContent = "--";
        document.getElementById("total-generos").textContent = "0";
        document.getElementById("resultado-filtros").textContent ="Nenhuma sitcom encontrada. Tente alterar os filtros.";
        return;
    }

    mostrarIndicadores(seriesFiltradas);
    graficoDecadas(seriesFiltradas);
    graficoTop10(seriesFiltradas);
    graficoMedias(seriesFiltradas);
    graficoPrincipal(seriesFiltradas);
    graficoGeneros(seriesFiltradas);
}


function limparFiltros() {
    document.getElementById("busca-serie").value = "";
    document.getElementById("filtro-decada").value = "todas";
    document.getElementById("filtro-genero").value = "todos";
    aplicarFiltros();
}

iniciarDashboard();
