// Game configuration
const SECRET_NUMBER = 50;
let attempts = 0;
let gameActive = true;

// DOM elements
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const messageArea = document.getElementById('messageArea');
const attemptCount = document.getElementById('attemptCount');
const restartBtn = document.getElementById('restartBtn');
const themeToggle = document.getElementById('themeToggle');
const gameArea = document.querySelector('.game-area');
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');

// Initialize game
function initGame() {
    attempts = 0;
    gameActive = true;
    guessInput.value = '';
    guessInput.disabled = false;
    submitBtn.disabled = false;
    messageArea.className = 'message';
    messageArea.textContent = '';
    messageArea.classList.remove('show');
    restartBtn.style.display = 'none';
    gameArea.classList.remove('win', 'game-over');
    updateAttempts();
}

// Update attempts display
function updateAttempts() {
    attemptCount.textContent = attempts;
}

// Play sound effects
function playSound(sound) {
    try {
        sound.currentTime = 0;
        sound.play().catch(() => {}); // Ignore autoplay errors
    } catch (e) {
        // Sound not supported
    }
}

// Main game logic
function checkGuess() {
    const guess = parseInt(guessInput.value);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        showMessage('❌ Please enter a valid number between 1 and 100!', 'error');
        playSound(loseSound);
        return;
    }
    
    attempts++;
    updateAttempts();
    
    // Check game conditions exactly as specified
    if (guess === SECRET_NUMBER) {
        showMessage(`🎉 Congratulations! You win the game after ${attempts} attempts`, 'success');
        playSound(winSound);
        endGame();
        return;
    }
    
    if (guess >= 45 && guess <= 49) {
        showMessage('👉 You entered a number very close but less than the guess', 'close-low');
    } else if (guess >= 51 && guess <= 54) {
        showMessage('👉 You entered a number very close but greater than the guess', 'close-high');
    } else {
        showMessage('❌ You entered the wrong number', 'error');
    }
    
    playSound(loseSound);
    guessInput.value = '';
    guessInput.focus();
}

// Show message with animation
function showMessage(text, type) {
    messageArea.textContent = text;
    messageArea.className = `message ${type} show`;
}

// End game
function endGame() {
    gameActive = false;
    guessInput.disabled = true;
    submitBtn.disabled = true;
    restartBtn.style.display = 'block';
    gameArea.classList.add('win', 'game-over');
}

// Event listeners
submitBtn.addEventListener('click', checkGuess);

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && gameActive) {
        checkGuess();
    }
});

restartBtn.addEventListener('click', initGame);

// Theme toggle (dark/light mode)
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Optional enhancements:
// 1. Sound effects (implemented with data URLs)
// 2. Win animation (CSS keyframes)
// 3. Dark/light mode toggle (fully implemented)
// 4. Responsive design (media queries)
// 5. Input validation
// 6. Keyboard support (Enter key)
// 7. Focus management

// Initialize on page load
document.addEventListener('DOMContentLoaded', initGame);
