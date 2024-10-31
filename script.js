// script.js

document.addEventListener("DOMContentLoaded", () => {
    const target = document.getElementById("target");
    const scoreDisplay = document.getElementById("score");
    const startButton = document.getElementById("start-button");
    let score = 0;
    let targetTimeout;

    function startGame() {
        score = 0;
        scoreDisplay.textContent = `Puntuación: ${score}`;
        startButton.style.display = "none"; // Oculta el botón de inicio
        showTarget(); // Muestra el primer objetivo
    }

    function showTarget() {
        const gameContainer = document.getElementById("game-container");
        const containerWidth = gameContainer.clientWidth;
        const containerHeight = gameContainer.clientHeight;
        const targetSize = target.clientWidth;

        // Coordenadas aleatorias dentro del contenedor
        const x = Math.random() * (containerWidth - targetSize);
        const y = Math.random() * (containerHeight - targetSize);

        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
        target.style.display = "block";

        // Temporizador para desaparecer el objetivo
        targetTimeout = setTimeout(hideTarget, 1000); // Desaparece después de 1 segundo
    }

    function hideTarget() {
        target.style.display = "none";
        // Si el juego sigue activo, muestra el próximo objetivo
        setTimeout(showTarget, 500); // Vuelve a aparecer después de 0.5 segundos
    }

    function increaseScore() {
        score++;
        scoreDisplay.textContent = `Puntuación: ${score}`;
        hideTarget();
        clearTimeout(targetTimeout);
        setTimeout(showTarget, 500);
    }

    // Evento para iniciar el juego al hacer clic en el botón "Start"
    startButton.addEventListener("click", startGame);
    target.addEventListener("click", increaseScore);
});
