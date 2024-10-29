const canvas = document.getElementById("gameCanvas");
   const ctx = canvas.getContext("2d");
   const dialogBox = document.getElementById("dialog");
   const startScreen = document.getElementById("start-screen");
   const endScreen = document.getElementById("end-screen");
   const startButton = document.getElementById("start-button");
   const restartButton = document.getElementById("restart-button");
   let gameStarted = false;
   let gameEnded = false;
   // Configurações do jogador
   const player = {
     x: 50,
     y: 50,
     width: 40,
     height: 40,
     speed: 5,
     color: "white",
     inventory: []
   };
   // Pacientes e remédios
   const patients = [
     { x: 100, y: 200, cured: false, neededItem: "Remédio A" },
     { x: 200, y: 300, cured: false, neededItem: "Remédio B" },
     // Adicionar mais pacientes conforme necessário
   ];
   const items = [
     { x: 400, y: 150, name: "Remédio A" },
     { x: 300, y: 400, name: "Remédio B" },
     // Adicionar mais itens conforme necessário
   ];
   // Função para iniciar o jogo
   function startGame() {
     gameStarted = true;
     startScreen.style.display = "none"; // Esconde a tela de início
     canvas.style.display = "block"; // Mostra o canvas
     requestAnimationFrame(gameLoop);
   }
   // Função para finalizar o jogo
   function endGame() {
     gameEnded = true;
     canvas.style.display = "none"; // Esconde o canvas
     endScreen.style.display = "block"; // Mostra a tela final
   }
   // Função principal do jogo
   function gameLoop() {
     if (gameEnded) return;
     clearCanvas();
     drawPlayer();
     drawPatients();
     drawItems();
     checkInteractions();
     requestAnimationFrame(gameLoop); // Loop contínuo do jogo
   }
   function clearCanvas() {
     ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa a tela
   }
   function drawPlayer() {
     ctx.fillStyle = player.color;
     ctx.fillRect(player.x, player.y, player.width, player.height); // Desenha o jogador
   }
   function drawPatients() {
     ctx.fillStyle = "green";
     patients.forEach(patient => {
       if (!patient.cured) {
         ctx.fillRect(patient.x, patient.y, 40, 40); // Desenha os pacientes
       }
     });
   }
   function drawItems() {
     ctx.fillStyle = "blue";
     items.forEach(item => {
       ctx.fillRect(item.x, item.y, 30, 30); // Desenha os itens
     });
   }
   function checkInteractions() {
     // Verificar interação com pacientes
     patients.forEach((patient, index) => {
       if (!patient.cured && checkCollision(player, patient)) {
         const neededItem = patient.neededItem;
         if (player.inventory.includes(neededItem)) {
           dialogBox.innerText = `Você curou o paciente com o ${neededItem}!`;
           patient.cured = true;
           setTimeout(() => {
             dialogBox.style.display = "none";
           }, 2000);
         } else {
           dialogBox.innerText = `Este paciente precisa do ${neededItem}.`;
         }
         dialogBox.style.display = "block";
       }
     });
     // Verificar interação com itens
     items.forEach((item, index) => {
       if (checkCollision(player, item)) {
         dialogBox.innerText = `Você pegou o ${item.name}!`;
         player.inventory.push(item.name);
         items.splice(index, 1);  // Remover item após pegar
         dialogBox.style.display = "block";
         setTimeout(() => {
           dialogBox.style.display = "none";
         }, 2000);
       }
     });
     // Checar se todos os pacientes foram curados
     if (patients.every(patient => patient.cured)) {
       endGame(); // Termina o jogo se todos os pacientes estiverem curados
     }
   }
   function checkCollision(rect1, rect2) {
     return rect1.x < rect2.x + 40 &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + 40 &&
            rect1.y + rect1.height > rect2.y;
   }
   // Movimentação do jogador
   document.addEventListener("keydown", (e) => {
     if (!gameStarted) return;
     switch (e.key) {
       case "ArrowUp":
         player.y -= player.speed;
         break;
       case "ArrowDown":
         player.y += player.speed;
         break;
       case "ArrowLeft":
         player.x -= player.speed;
         break;
       case "ArrowRight":
         player.x += player.speed;
         break;
     }
   });
   // Iniciar o jogo ao clicar no botão
   startButton.addEventListener("click", startGame);
   // Reiniciar o jogo ao clicar no botão de reinício
   restartButton.addEventListener("click", () => {
     location.reload(); // Recarrega a página para resetar o jogo
   });