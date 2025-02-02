const passwordInput = document.getElementById('password-input');
const passwordContainer = document.getElementById('password-container');
const mainContent = document.getElementById('main-content');
const errorMessage = document.getElementById('error-message');

const correctPassword = "BOO"; // Correct password set here

function checkPassword() {
  const enteredPassword = passwordInput.value;

  if (enteredPassword === correctPassword) {
    passwordContainer.style.display = 'none';
    mainContent.style.display = 'block';
    errorMessage.textContent = "";
  } else {
    errorMessage.textContent = "Incorrect passkey. Please try again.";
  }
}