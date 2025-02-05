const passwordInput = document.getElementById('password-input');
const passwordContainer = document.getElementById('password-container');
const errorMessage = document.getElementById('error-message');
const puzzleContainer = document.getElementById('puzzle-container');
const mainContent = document.getElementById('main-content');

const correctPassword = "NIGHT".toLowerCase(); // Store lowercase version

function checkPassword() {
  const enteredPassword = passwordInput.value.toLowerCase(); // Convert input to lowercase
  if (enteredPassword === correctPassword) {
    passwordContainer.style.display = 'none';
    puzzleContainer.style.display = 'block';
    errorMessage.textContent = "";
  } else {
    errorMessage.textContent = "Incorrect passkey. Try again.";
  }
}

const puzzleAnswers = {
  1: 'clock'.toLowerCase(), // Store lowercase versions of answers
  2: '12:45'.toLowerCase(),
  3: 'Arboretum'.toLowerCase(),
  4: 'silence'.toLowerCase()
};

function checkPuzzle(puzzleNumber) { // No need to pass correctAnswer as it's in puzzleAnswers
  const inputField = document.getElementById(`puzzle${puzzleNumber}-input`);
  const userAnswer = inputField.value.trim().toLowerCase(); // Convert user input to lowercase
  const errorField = document.getElementById(`puzzle${puzzleNumber}-error`);
  const correctAnswer = puzzleAnswers[puzzleNumber]; // Retrieve correct answer

  if (userAnswer === correctAnswer) { // Compare lowercase versions
    errorField.textContent = "";
    document.getElementById(`puzzle${puzzleNumber}`).style.display = 'none';
    if (puzzleNumber < 4) {
      document.getElementById(`puzzle${puzzleNumber + 1}`).style.display = 'block';
    } else {
      puzzleContainer.style.display = 'none';
      mainContent.style.display = 'block';
    }
  } else {
    errorField.textContent = "Wrong answer. Try again.";
  }
}