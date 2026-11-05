function irParaSeries() {
    const secao = document.getElementById("series");

    if (secao) {
        window.scrollTo({
            top: secao.offsetTop - 70,
            behavior: "smooth"
        });
    } else {
        window.location.href = "index.html#series";
    }
}

function irParaContato() {
    if (document.getElementById("contato")) {
        const secao = document.getElementById("contato");

        window.scrollTo({
            top: secao.offsetTop - 70,
            behavior: "smooth"
        });

    } else {
        window.location.href = "index.html#contato";
    }
}

function enviarWhatsApp(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const mensagem = document.getElementById("mensagem").value;

    const texto =
        `Olá! Meu nome é ${nome}.\n\nMinha recomendação/opinião sobre sitcoms:\n${mensagem}`;

    const numero = "5581987110351";

    window.open(
        `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`,
        "_blank"
    );
}


document.addEventListener("DOMContentLoaded", function () {
    const botao = document.querySelector(".botao-menu");
    const menu = document.getElementById("menu-principal");

    if (!botao || !menu) return;

    function alternarMenu(abrir) {
        menu.classList.toggle("aberto", abrir);
        botao.setAttribute("aria-expanded", abrir);
        botao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
    }

    botao.addEventListener("click", function () {
        alternarMenu(!menu.classList.contains("aberto"));
    });

    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () { alternarMenu(false); });
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") alternarMenu(false);
    });

    document.addEventListener("click", function (e) {
        if (!menu.contains(e.target) && !botao.contains(e.target)) alternarMenu(false);
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) alternarMenu(false);
    });
});
