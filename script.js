const passwordInput = document.getElementById('password-input');
const passwordContainer = document.getElementById('password-container');
const mainContent = document.getElementById('main-content');
const errorMessage = document.getElementById('error-message');

const correctPassword = "BOO"; // **REPLACE THIS!**

function checkPassword() {
  const enteredPassword = passwordInput.value;

  if (enteredPassword === correctPassword) {
    passwordContainer.style.display = 'none';
    mainContent.style.display = 'block';
    errorMessage.textContent = ""; // Clear any previous errors
  } else {
    errorMessage.textContent = "Incorrect passkey. Please try again.";
  }
}