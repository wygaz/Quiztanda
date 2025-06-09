
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

    const modos = ["modo1", "modo2"];
    const modo = modos[Math.floor(Math.random() * modos.length)];

    const perguntaContainer = document.getElementById("perguntaContainer");
    const opcoesContainer = document.getElementById("opcoesContainer");
    const pontuacaoDiv = document.getElementById("pontuacao");
    perguntaContainer.innerHTML = "";
    opcoesContainer.innerHTML = "";

    const frutas = ["banana", "maca", "laranja", "tomate"];
    const estados = ["ótimo", "bom", "atenção", "descartável"];
    const fruta = frutas[Math.floor(Math.random() * frutas.length)];
    const estadoCorreto = estados[Math.floor(Math.random() * estados.length)];

    if (modo === "modo1") {
        const imagem = document.createElement("img");
        imagem.src = `imagens/${fruta}/${fruta}_${estadoCorreto}.jpg`;
        imagem.alt = fruta;
        imagem.style.width = "200px";
        perguntaContainer.appendChild(imagem);

        const perguntaTexto = document.createElement("p");
        perguntaTexto.innerText = "Qual o estado desta fruta?";
        perguntaContainer.appendChild(perguntaTexto);

        const opcoes = [...estados].sort(() => Math.random() - 0.5);
        opcoes.forEach((estado) => {
            const btn = document.createElement("button");
            btn.innerText = estado;
            btn.onclick = () => verificarResposta(estado, estadoCorreto);
            opcoesContainer.appendChild(btn);
        });
    } else {
        const perguntaTexto = document.createElement("p");
        perguntaTexto.innerText = `Qual dessas está no estado: ${estadoCorreto}?`;
        perguntaContainer.appendChild(perguntaTexto);

        const opcoes = [...estados].sort(() => Math.random() - 0.5);
        opcoes.forEach((estado) => {
            const img = document.createElement("img");
            img.src = `imagens/${fruta}/${fruta}_${estado}.jpg`;
            img.alt = estado;
            img.style.width = "150px";
            img.style.margin = "10px";
            img.style.cursor = "pointer";
            img.onclick = () => verificarResposta(estado, estadoCorreto);
            opcoesContainer.appendChild(img);
        });
    }

    pontuacaoDiv.innerText = `Você acertou ${pontuacao} de ${questaoAtual} questões respondidas`;
}

function verificarResposta(resposta, correta) {
    if (resposta === correta) {
        pontuacao++;
    }
    questaoAtual++;
    carregarQuiz();
}

function finalizarQuiz() {
    alert(`${nomeUsuario}, você acertou ${pontuacao} de ${totalQuestoes} questões.`);
    window.location.href = "index.html";
}
