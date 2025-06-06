
let perguntas = [];
let questaoAtual = 0;
let pontuacao = 0;
let totalQuestoes = 10;

function carregarQuiz() {
    const nome = localStorage.getItem("nomeUsuario");
    const qtd = localStorage.getItem("quantidadeQuestoes");

    if (!nome || !qtd) {
        alert("Nome ou quantidade de questões não definido.");
        window.location.href = "index.html";
        return;
    }

    totalQuestoes = parseInt(qtd);
    document.getElementById("nomeUsuario").innerText = nome;

    perguntas = embaralhar(perguntasOriginais).slice(0, totalQuestoes);
    console.log(">>> Total de questões selecionadas:", perguntas.length);

    exibirProximaPergunta();
}

function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

function exibirProximaPergunta() {
    if (questaoAtual >= perguntas.length) {
        mostrarResultadoFinal();
        return;
    }

    const pergunta = perguntas[questaoAtual];
    const perguntaContainer = document.getElementById("perguntaContainer");
    perguntaContainer.innerHTML = "";

    const imagem = document.createElement("img");
    imagem.src = pergunta.imagem;
    imagem.alt = "Imagem da fruta";
    imagem.style.width = "200px";

    const textoPergunta = document.createElement("p");
    textoPergunta.innerText = pergunta.texto;

    perguntaContainer.appendChild(imagem);
    perguntaContainer.appendChild(textoPergunta);

    const opcoesContainer = document.getElementById("opcoesContainer");
    opcoesContainer.innerHTML = "";

    pergunta.opcoes.forEach((opcao, index) => {
        const botao = document.createElement("button");
        botao.innerText = opcao;
        botao.onclick = () => verificarResposta(index, pergunta.correta);
        opcoesContainer.appendChild(botao);
    });

    atualizarPontuacao();
    console.log(">> Questão atual:", questaoAtual + 1);
}

function verificarResposta(respostaSelecionada, respostaCorreta) {
    console.log("Resposta correta:", respostaCorreta, "Selecionada:", respostaSelecionada);
    if (respostaSelecionada === respostaCorreta) {
        pontuacao++;
    }
    questaoAtual++;
    console.log("Nova pontuação:", pontuacao);
    exibirProximaPergunta();
}

function atualizarPontuacao() {
    const pontuacaoDiv = document.getElementById("pontuacao");
    pontuacaoDiv.innerText = `Você acertou ${pontuacao} de ${questaoAtual} questões respondidas`;
}

function mostrarResultadoFinal() {
    const perguntaContainer = document.getElementById("perguntaContainer");
    const opcoesContainer = document.getElementById("opcoesContainer");

    perguntaContainer.innerHTML = "<h3>Teste concluído!</h3>";
    opcoesContainer.innerHTML = `<p>Pontuação final: ${pontuacao} de ${totalQuestoes}</p>`;
    console.log("Teste finalizado: ", pontuacao, "/", totalQuestoes);
}
