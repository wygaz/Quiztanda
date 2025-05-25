
const nome = localStorage.getItem("nome") || 'visitante';
document.getElementById("saudacao").textContent = 'Vamos lá, ' + nome + '!';

const frutas = ["banana", "cenoura", "tomate", "batata", "alface", "abacate", "laranja", "maca"];
const estados = ["otimo", "boa", "atencao", "ruim"];
const perguntas = [
    {texto: "Clique na imagem em ótimo estado", resposta: "otimo"},
    {texto: "Clique na imagem boa para consumo", resposta: "boa"},
    {texto: "Clique na imagem em estado de atenção", resposta: "atencao"},
    {texto: "Clique na imagem que deve ser descartada", resposta: "ruim"}
];

let pontuacao = 0;

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
        src: `imagens/${fruta}_${e}.jpg`,
        estado: e
    }));
    shuffle(imagens);

    const div = document.getElementById("imagens");
    div.innerHTML = "";
    imagens.forEach(imgData => {
        const img = document.createElement("img");
        img.src = imgData.src;
        img.onclick = () => responder(imgData.estado === pergunta.resposta);
        div.appendChild(img);
    });

    document.getElementById("feedback").textContent = "";
}

function responder(correto) {
    const feedback = document.getElementById("feedback");
    if (correto) {
        pontuacao++;
        feedback.textContent = "Muito bem, " + nome + "! Pontuação: " + pontuacao;
    } else {
        feedback.textContent = "Ops, tente novamente, " + nome + "!";
    }
}

window.onload = novaPergunta;
