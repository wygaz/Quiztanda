
let pontuacao = 0;
function responder(correto) {
    const feedback = document.getElementById("feedback");
    if (correto) {
        pontuacao++;
        feedback.textContent = "Muito bem! Pontuação: " + pontuacao;
    } else {
        feedback.textContent = "Tente novamente! Pontuação: " + pontuacao;
    }
}
