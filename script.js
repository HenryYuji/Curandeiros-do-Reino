const symptomsRemedies = [
    { symptom: "Inchaço", remedy: "Ervas aromáticas", image: "imagens/person_buboes.png" },
    { symptom: "Febre", remedy: "Alho", image: "imagens/person_fever.png" },
    { symptom: "Calafrios", remedy: "Chá de Ervas", image: "imagens/person_chills.png" },
    { symptom: "Dor de cabeça", remedy: "Hortelã", image: "imagens/person_headache.png" },
    { symptom: "Vômitos", remedy: "Água purificada", image: "imagens/person_vomiting.png" }
];

let correct = 0;
let wrong = 0;
let currentSymptom = {};
let lastSymptom = {};
let rounds = 5;

function startGame() {
    if (rounds <= 0) {
        document.getElementById("result").textContent = `Rodada encerrada! Você acertou ${correct} e errou ${wrong}.`;
        document.getElementById("new-round").style.display = "block";
        document.getElementById("remedies-container").style.display = "none";
        document.getElementById("rounds-left").style.display = "none";
    } else {
        do {
            currentSymptom = symptomsRemedies[Math.floor(Math.random() * symptomsRemedies.length)];
        } while (currentSymptom.symptom === lastSymptom.symptom);
        
        lastSymptom = currentSymptom;
        
        document.getElementById("person-symptom").textContent = `Sintoma: ${currentSymptom.symptom}`;
        document.getElementById("person-image").src = currentSymptom.image;
        document.getElementById("result").textContent = "Escolha um remédio para o sintoma.";
        document.getElementById("rounds-left").textContent = `Pessoas restantes nesta rodada: ${rounds}`;
    }
}

function giveRemedy(remedy) {
    if (remedy === currentSymptom.remedy) {
        correct++;
        document.getElementById("result").textContent = "Correto! Você acertou o remédio.";
    } else {
        wrong++;
        document.getElementById("result").textContent = `Errado! O remédio correto era ${currentSymptom.remedy}.`;
    }
    rounds--;

    document.getElementById("score").textContent = `Acertos: ${correct} | Erros: ${wrong}`;
    document.getElementById("rounds-left").textContent = `Pessoas restantes nesta rodada: ${rounds}`;

    setTimeout(() => {
        if (rounds > 0) {
            startGame();
        } else {
            document.getElementById("result").textContent = `Rodada encerrada! Você acertou ${correct} e errou ${wrong}.`;
            document.getElementById("new-round").style.display = "block";
            document.getElementById("remedies-container").style.display = "none";
            document.getElementById("rounds-left").style.display = "none";
        }
    }, 1000);
}

document.getElementById("new-round").addEventListener("click", () => {
    correct = 0;
    wrong = 0;
    rounds = 5;
    document.getElementById("score").textContent = `Acertos: 0 | Erros: 0`;
    document.getElementById("new-round").style.display = "none";
    document.getElementById("remedies-container").style.display = "block";
    document.getElementById("rounds-left").style.display = "block";
    startGame();
});

startGame();
