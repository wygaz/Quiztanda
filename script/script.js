
let perguntas = [];  // será carregado do JSON
let indiceAtual = 0;
let pontuacao = 0;
let maxQuestoes = 10; // valor padrão

function iniciarQuiz(parametros = {}) {
    if (parametros.quantidade) maxQuestoes = parametros.quantidade;
    indiceAtual = 0;
    pontuacao = 0;
    embaralhar(perguntas);
    exibirPergunta();
}

function exibirPergunta() {
    if (indiceAtual >= maxQuestoes) {
        return finalizarQuiz();
    }

    const pergunta = perguntas[indiceAtual];
    const modo = pergunta.modo;
    const fruta = pergunta.fruta;
    const estado = pergunta.estado;

    let container = document.getElementById("quiz-container");
    container.innerHTML = "";

    if (modo === 1) {
        // Exibe uma imagem + 4 opções de texto
        let img = document.createElement("img");
        img.src = `imagens/${fruta}/${fruta}_${estado}.jpg`;
        img.alt = fruta;
        img.width = 200;
        container.appendChild(img);

        let opcoes = embaralhar(["otimo", "bom", "atencao", "descartavel"]);
        opcoes.forEach(opcao => {
            let btn = document.createElement("button");
            btn.innerText = opcao;
            btn.onclick = () => validarResposta(opcao, estado);
            container.appendChild(btn);
        });

    } else {
        // Exibe texto do estado + 4 imagens para escolher
        let p = document.createElement("p");
        p.innerText = `Clique na imagem que representa o estado: ${estado}`;
        container.appendChild(p);

        let frutasMisturadas = embaralhar(frutas.slice(0, 4)); // pegar 4 aleatórias
        frutasMisturadas.forEach(f => {
            let img = document.createElement("img");
            img.src = `imagens/${f}/${f}_${estado}.jpg`;
            img.alt = f;
            img.width = 150;
            img.onclick = () => validarResposta(f === fruta ? estado : "errado", estado);
            container.appendChild(img);
        });
    }

    let finalizarBtn = document.createElement("button");
    finalizarBtn.innerText = "Finalizar Agora";
    finalizarBtn.onclick = finalizarQuiz;
    container.appendChild(finalizarBtn);
}

function validarResposta(resposta, correta) {
    if (resposta === correta) {
        pontuacao++;
        alert("✅ Resposta correta!");
    } else {
        alert(`❌ Errado. Resposta correta era: ${correta}`);
    }
    indiceAtual++;
    exibirPergunta();
}

function finalizarQuiz() {
    let container = document.getElementById("quiz-container");
    container.innerHTML = `<h2>Quiz finalizado!</h2><p>Você acertou ${pontuacao} de ${indiceAtual} questões.</p>`;
}

function embaralhar(array) {
    let copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}
