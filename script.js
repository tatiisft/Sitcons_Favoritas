function irParaSeries() {
    if (window.location.pathname.includes("index.html") ||
        window.location.pathname === "/") {

        const secao = document.getElementById("series");

        window.scrollTo({
            top: secao.offsetTop - 50,
            behavior: "smooth"
        });

    } else {
        window.location.href = "index.html#series";
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