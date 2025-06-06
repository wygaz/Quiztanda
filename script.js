
let pontuacao = 0;
let questaoAtual = 0;
let totalQuestoes = 10; // valor padrão
let nomeUsuario = "";

function iniciarQuiz() {
    nomeUsuario = document.getElementById("nomeUsuario").value;
    const quantidadeInput = document.getElementById("quantidadeQuestoes").value;
    if (quantidadeInput) {
        totalQuestoes = parseInt(quantidadeInput);
    }
    window.location.href = "quiz.html";
}

function carregarQuiz() {
    if (questaoAtual >= totalQuestoes) {
        finalizarQuiz();
        return;
    }

    const modos = ["modo1", "modo2"];
    const modoEscolhido = modos[Math.floor(Math.random() * modos.length)];

    const pergunta = document.getElementById("pergunta");
    const opcoes = document.getElementById("opcoes");
    const pontuacaoText = document.getElementById("pontuacao");

    // Exemplo fictício de frutas e estados
    const frutas = ["banana", "maçã", "laranja", "tomate"];
    const estados = ["ótimo", "bom", "atenção", "descartável"];
    const fruta = frutas[Math.floor(Math.random() * frutas.length)];
    const estadoCorreto = estados[Math.floor(Math.random() * estados.length)];

    pergunta.innerText = "Qual o estado desta fruta?";

    opcoes.innerHTML = "";
    const estadosMisturados = [...estados].sort(() => Math.random() - 0.5);
    estadosMisturados.forEach(estado => {
        const btn = document.createElement("button");
        btn.innerText = estado;
        btn.onclick = () => verificarResposta(estado, estadoCorreto);
        opcoes.appendChild(btn);
    });

    pontuacaoText.innerText = `Pontuação: ${pontuacao}`;
}

function verificarResposta(resposta, correta) {
    if (resposta === correta) {
        pontuacao++;
        alert("Correto!");
    } else {
        alert("Errado. A resposta correta era: " + correta);
    }
    questaoAtual++;
    carregarQuiz();
}

function finalizarQuiz() {
    alert(`${nomeUsuario}, você acertou ${pontuacao} de ${totalQuestoes} questões.`);
    window.location.href = "index.html";
}

if (window.location.pathname.includes("quiz.html")) {
    window.onload = carregarQuiz;
}
