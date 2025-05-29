
const frutas = [
    "banana", "cenoura", "tomate", "batata", "alface", "abacate", "laranja",
    "maca", "pera", "morango", "couve", "brocolis", "manga", "pepino", "uva"
];

const estados = ["otimo", "bom", "atencao", "descartavel"];
const rotulos = {
    otimo: "Em ótimo estado",
    bom: "Bom para consumo",
    atencao: "Em estado de atenção",
    descartavel: "Descartável"
};

const modo = "imagem_unica"; // ou "quatro_imagens"

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function novaPergunta() {
    const fruta = frutas[Math.floor(Math.random() * frutas.length)];
    const estado = estados[Math.floor(Math.random() * estados.length)];
    const divImgs = document.getElementById("imagens");
    const divOpts = document.getElementById("opcoes");
    const feedback = document.getElementById("feedback");
    feedback.textContent = "";
    divImgs.innerHTML = "";
    divOpts.innerHTML = "";

    if (modo === "imagem_unica") {
        const img = document.createElement("img");
        img.src = `imagens/${fruta}/${fruta}_${estado}.jpg`;
        img.alt = rotulos[estado];
        divImgs.appendChild(img);

        document.getElementById("pergunta").textContent = `Qual o estado desta fruta?`;

        estados.forEach(e => {
            const btn = document.createElement("button");
            btn.className = "resposta";
            btn.textContent = rotulos[e];
            btn.onclick = () => {
                feedback.textContent = (e === estado) ? "✅ Acertou!" : "❌ Tente novamente.";
            };
            divOpts.appendChild(btn);
        });

    } else {
        document.getElementById("pergunta").textContent = `Clique na fruta em ${rotulos[estado].toLowerCase()}.`;
        const imagens = estados.map(e => ({
            src: `imagens/${fruta}/${fruta}_${e}.jpg`,
            estado: e
        }));
        shuffle(imagens);
        imagens.forEach(imgData => {
            const img = document.createElement("img");
            img.src = imgData.src;
            img.alt = rotulos[imgData.estado];
            img.onclick = () => {
                feedback.textContent = (imgData.estado === estado) ? "✅ Acertou!" : "❌ Tente novamente.";
            };
            divImgs.appendChild(img);
        });
    }
}
