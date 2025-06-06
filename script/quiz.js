
const perguntasPorEstado = {
    "otimo": "Qual dessas está em ótimo estado?",
    "bom": "Qual dessas está boa para consumo?",
    "atencao": "Qual dessas está em estado de atenção?",
    "descartavel": "Qual dessas deve ser descartada?"
};

const TOTAL_QUESTOES = 10;

let filaPerguntas = [{"fruta": "tomate", "estado": "atencao", "modo": 1}, {"fruta": "alface", "estado": "atencao", "modo": 2}, {"fruta": "laranja", "estado": "descartavel", "modo": 1}, {"fruta": "tomate", "estado": "descartavel", "modo": 1}, {"fruta": "morango", "estado": "descartavel", "modo": 2}, {"fruta": "pepino", "estado": "bom", "modo": 2}, {"fruta": "tomate", "estado": "atencao", "modo": 2}, {"fruta": "uva", "estado": "bom", "modo": 1}, {"fruta": "alface", "estado": "bom", "modo": 2}, {"fruta": "morango", "estado": "bom", "modo": 1}];
let pontuacao = 0;
let questaoAtual = 0;

function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

function iniciarQuiz() {
    filaPerguntas = embaralhar(filaPerguntas);
    pontuacao = 0;
    questaoAtual = 0;
    document.getElementById("resultado").innerText = "";
    gerarProximaPergunta();
}

function gerarProximaPergunta() {
    if (questaoAtual >= TOTAL_QUESTOES) {
        encerrarQuiz();
        return;
    }

    const { fruta, estado, modo } = filaPerguntas[questaoAtual];
    questaoAtual++;

    if (modo === 1) {
        gerarPerguntaModo1(fruta, estado);
    } else {
        gerarPerguntaModo2(fruta, estado);
    }
}

function gerarPerguntaModo1(fruta, estadoCorreto) {
    const pergunta = "Qual é o estado desta fruta?";
    document.getElementById("pergunta").innerText = pergunta;
    document.getElementById("imagem").src = `imagens/${fruta}/${fruta}_${estadoCorreto}.jpg`;

    const opcoes = embaralhar(["otimo", "bom", "atencao", "descartavel"]);
    const container = document.getElementById("opcoes");
    container.innerHTML = "";

    opcoes.forEach(opcao => {
        const btn = document.createElement("button");
        btn.innerText = opcao.charAt(0).toUpperCase() + opcao.slice(1);
        btn.onclick = () => verificarResposta(opcao, estadoCorreto);
        container.appendChild(btn);
    });
}

function gerarPerguntaModo2(fruta, estadoPergunta) {
    const pergunta = perguntasPorEstado[estadoPergunta];
    document.getElementById("pergunta").innerText = pergunta;
    document.getElementById("imagem").src = "";

    const container = document.getElementById("opcoes");
    container.innerHTML = "";

    ["otimo", "bom", "atencao", "descartavel"].forEach(estado => {
        const img = document.createElement("img");
        img.src = `imagens/${fruta}/${fruta}_${estado}.jpg`;
        img.alt = estado;
        img.style.width = "150px";
        img.style.margin = "10px";
        img.style.cursor = "pointer";
        img.onclick = () => verificarResposta(estado, estadoPergunta);
        container.appendChild(img);
    });
}

function verificarResposta(resposta, correta) {
    if (resposta === correta) {
        pontuacao++;
        alert("✅ Correto!");
    } else {
        alert(`❌ Incorreto. O certo era: ${correta}`);
    }
    gerarProximaPergunta();
}

function encerrarQuiz() {
    const mensagem = `Você acertou ${pontuacao} de ${TOTAL_QUESTOES} questões.`;
    document.getElementById("pergunta").innerText = "Fim do Quiz!";
    document.getElementById("imagem").src = "";
    document.getElementById("opcoes").innerHTML = "";

    const resultado = document.getElementById("resultado");
    resultado.innerText = mensagem;

    const reiniciarBtn = document.createElement("button");
    reiniciarBtn.innerText = "Reiniciar Quiz";
    reiniciarBtn.onclick = iniciarQuiz;
    resultado.appendChild(document.createElement("br"));
    resultado.appendChild(reiniciarBtn);
}

document.addEventListener("DOMContentLoaded", iniciarQuiz);
