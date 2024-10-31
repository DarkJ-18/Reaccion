// script.js

document.addEventListener("DOMContentLoaded", () => {
    const target = document.getElementById("target");
    const scoreDisplay = document.getElementById("score");
    const levelDisplay = document.getElementById("level");
    const timerDisplay = document.getElementById("timer");
    const startButton = document.getElementById("start-button");
    let score = 0;
    let level = 1;
    let timeLeft = 30; // Tiempo inicial en segundos
    let targetTimeout;
    let gameInterval;

    function startGame() {
        score = 0;
        level = 1;
        timeLeft = 30;
        scoreDisplay.textContent = `Puntuación: ${score}`;
        levelDisplay.textContent = `Nivel: ${level}`;
        timerDisplay.textContent = `Tiempo: ${timeLeft}`;
        startButton.style.display = "none"; // Oculta el botón de inicio
        showTarget(); // Muestra el primer objetivo
        startTimer(); // Inicia el temporizador
    }

    function startTimer() {
        gameInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Tiempo: ${timeLeft}`;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(gameInterval);
        target.style.display = "none"; // Oculta el objetivo al final
        alert(`Juego terminado. Tu puntuación final es: ${score}`);
        startButton.style.display = "block"; // Muestra el botón de inicio
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
        targetTimeout = setTimeout(hideTarget, 1000 - (level * 20)); // Disminuye el tiempo de aparición según el nivel
    }

    function hideTarget() {
        target.style.display = "none";
        // Si el juego sigue activo, muestra el próximo objetivo
        setTimeout(showTarget, 500 - (level * 10)); // Aumenta la frecuencia a medida que sube el nivel
    }

    function increaseScore() {
        score++;
        scoreDisplay.textContent = `Puntuación: ${score}`;

        // Aumentar nivel cada 10 puntos
        if (score % 10 === 0 && level < 50) {
            level++;
            levelDisplay.textContent = `Nivel: ${level}`;
        }

        hideTarget();
        clearTimeout(targetTimeout);
        setTimeout(showTarget, 500 - (level * 10));
    }

    // Evento para iniciar el juego al hacer clic en el botón "Start"
    startButton.addEventListener("click", startGame);
    target.addEventListener("click", increaseScore);
});
