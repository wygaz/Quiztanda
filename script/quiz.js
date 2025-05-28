
const frutas = [
    "banana", "cenoura", "tomate", "batata", "alface", "abacate", "laranja",
    "maca", "pera", "morango", "couve", "brocolis", "manga", "pepino", "uva"
];

const estados = ["otimo", "bom", "atencao", "descartavel"];

const perguntas = [
    { texto: "Qual o estado da fruta?" },
    { texto: "Esta fruta está boa para consumo?" },
    { texto: "Você comeria essa fruta nesse estado?" },
    { texto: "Esta fruta está em ótimo estado?" }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function novaPergunta() {
    const fruta = frutas[Math.floor(Math.random() * frutas.length)];
    const pergunta = perguntas[Math.floor(Math.random() * perguntas.length)];
    document.getElementById("pergunta").textContent = `${pergunta.texto} (${fruta})`;

    const imagens = estados.map(e => ({
        src: `imagens/${fruta}/${fruta}_${e}.jpg`,
        estado: e
    }));

    shuffle(imagens);

    const div = document.getElementById("imagens");
    div.innerHTML = "";
    imagens.forEach(imgData => {
        const img = document.createElement("img");
        img.src = imgData.src;
        img.alt = imgData.estado;
        img.style.width = "150px";
        img.style.margin = "10px";
        img.onclick = () => {
            const resultado = imgData.estado === "otimo" ? "✅ Acertou!" : "❌ Tente novamente";
            document.getElementById("feedback").textContent = resultado;
        };
        div.appendChild(img);
    });
}
