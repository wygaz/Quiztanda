
let pontuacao = 0;
let questaoAtual = 0;
let totalQuestoes = 10;
let nomeUsuario = "";

function iniciarQuiz() {
    const nome = document.getElementById("nomeUsuario").value;
    const qtd = parseInt(document.getElementById("quantidadeQuestoes").value);
    localStorage.setItem("nomeUsuario", nome);
    localStorage.setItem("totalQuestoes", qtd);
    window.location.href = "quiz.html";
}

function carregarQuiz() {
    nomeUsuario = localStorage.getItem("nomeUsuario") || "";
    totalQuestoes = parseInt(localStorage.getItem("totalQuestoes")) || 10;
    if (questaoAtual >= totalQuestoes) {
        finalizarQuiz();
        return;
    }

    const pergunta = perguntasOriginais[questaoAtual % perguntasOriginais.length];
    const perguntaContainer = document.getElementById("perguntaContainer");
    const opcoesContainer = document.getElementById("opcoesContainer");
    const pontuacaoDiv = document.getElementById("pontuacao");

    perguntaContainer.innerHTML = "";
    opcoesContainer.innerHTML = "";

    const img = document.createElement("img");
    img.src = pergunta.imagem;
    img.alt = "Fruta";
    img.style.width = "200px";
    perguntaContainer.appendChild(img);

    const texto = document.createElement("p");
    texto.innerText = pergunta.texto;
    perguntaContainer.appendChild(texto);

    pergunta.opcoes.forEach((opcao, index) => {
        const btn = document.createElement("button");
        btn.innerText = opcao;
        btn.onclick = () => verificarResposta(index, pergunta.correta);
        opcoesContainer.appendChild(btn);
    });

    pontuacaoDiv.innerText = `Você acertou ${pontuacao} de ${questaoAtual} questões respondidas`;
}

function verificarResposta(selecionada, correta) {
    if (selecionada === correta) {
        pontuacao++;
    }
    questaoAtual++;
    carregarQuiz();
}

function finalizarQuiz() {
    alert(`${nomeUsuario}, você acertou ${pontuacao} de ${totalQuestoes} questões.`);
    window.location.href = "index.html";
}
