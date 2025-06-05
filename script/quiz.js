const frutas = [
    "banana", "tomate", "maca", "laranja", "abacate", "pera", "morango", "cenoura",
    "batata", "alface", "couve", "brocolis", "manga", "pepino", "uva"
];

const estados = ["otimo", "bom", "atencao", "descartavel"];
const perguntasPorEstado = {
    "otimo": "Qual dessas está em ótimo estado?",
    "bom": "Qual dessas está boa para consumo?",
    "atencao": "Qual dessas está em estado de atenção?",
    "descartavel": "Qual dessas deve ser descartada?"
};

// Alternância entre modo 1 e 2
function gerarPergunta() {
    const modo = Math.random() < 0.5 ? 1 : 2; // 50% de chance para cada

    if (modo === 1) {
        gerarPerguntaModo1();
    } else {
        gerarPerguntaModo2();
    }
}

// MODO 1: 1 imagem, 4 opções de estado
function gerarPerguntaModo1() {
    const fruta = escolher(frutas);
    const estadoCorreto = escolher(estados);

    const imagemPath = `imagens/${fruta}/${fruta}_${estadoCorreto}.jpg`;
    document.getElementById("imagem").src = imagemPath;

    const pergunta = "Qual é o estado desta fruta?";
    document.getElementById("pergunta").innerText = pergunta;

    const opcoes = embaralhar([...estados]);
    const container = document.getElementById("opcoes");
    container.innerHTML = "";

    opcoes.forEach(opcao => {
        const btn = document.createElement("button");
        btn.innerText = opcao.charAt(0).toUpperCase() + opcao.slice(1);
        btn.onclick = () => verificarResposta(opcao, estadoCorreto);
        container.appendChild(btn);
    });
}

// MODO 2: 4 imagens, 1 pergunta direcionada
function gerarPerguntaModo2() {
    const fruta = escolher(frutas);
    const estadoPergunta = escolher(estados);

    const pergunta = perguntasPorEstado[estadoPergunta];
    document.getElementById("pergunta").innerText = pergunta;

    const container = document.getElementById("opcoes");
    container.innerHTML = "";

    estados.forEach(estado => {
        const img = document.createElement("img");
        img.src = `imagens/${fruta}/${fruta}_${estado}.jpg`;
        img.alt = estado;
        img.style.width = "150px";
        img.style.margin = "10px";
        img.style.cursor = "pointer";
        img.onclick = () => verificarResposta(estado, estadoPergunta);
        container.appendChild(img);
    });

    document.getElementById("imagem").src = ""; // limpa imagem central
}

function verificarResposta(resposta, correta) {
    if (resposta === correta) {
        alert("✅ Resposta correta!");
    } else {
        alert(`❌ Resposta incorreta. O correto era: ${correta}`);
    }
    gerarPergunta();
}

function escolher(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
}

function embaralhar(lista) {
    return lista.sort(() => Math.random() - 0.5);
}

// Início
document.addEventListener("DOMContentLoaded", gerarPergunta);
