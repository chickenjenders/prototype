const passwordInput = document.getElementById('password-input');
const passwordContainer = document.getElementById('password-container');
const errorMessage = document.getElementById('error-message');
const puzzleContainer = document.getElementById('puzzle-container'); // Ensure this element exists
const mainContent = document.getElementById('main-content');

const correctPassword = "BOO"; // Global passkey

function checkPassword() {
  const enteredPassword = passwordInput.value;
  if (enteredPassword === correctPassword) {
    passwordContainer.style.display = 'none';
    puzzleContainer.style.display = 'block'; // Ensure this element is displayed
    errorMessage.textContent = "";
  } else {
    errorMessage.textContent = "Incorrect passkey. Try again.";
  }
}

// Array of puzzle answers for simplicity
const puzzleAnswers = {
  1: 'ALPHA',
  2: '42',
  3: 'piano',
  4: 'NIGHT:'
};

function checkPuzzle(puzzleNumber, correctAnswer) {
  const inputField = document.getElementById(`puzzle${puzzleNumber}-input`);
  const userAnswer = inputField.value.trim().toLowerCase();
  const errorField = document.getElementById(`puzzle${puzzleNumber}-error`);

  if (userAnswer === correctAnswer.toLowerCase()) {
    errorField.textContent = "";
    // Hide current puzzle and show next puzzle or main content
    document.getElementById(`puzzle${puzzleNumber}`).style.display = 'none';
    if (puzzleNumber < 4) {
      document.getElementById(`puzzle${puzzleNumber + 1}`).style.display = 'block';
    } else {
      // Final puzzle solved, unlock main content
      puzzleContainer.style.display = 'none';
      mainContent.style.display = 'block';
    }
  } else {
    errorField.textContent = "Wrong answer. Try again.";
  }
}
