const passwordInput = document.getElementById('password-input');
const passwordContainer = document.getElementById('password-container');
const errorMessage = document.getElementById('error-message');
const puzzleContainer = document.getElementById('puzzle-container');
const mainContent = document.getElementById('main-content');

const correctPasswordHashes = ["176473d7313395b6e209bc6b1d57aa160b628706860aa0554d7af60a1d40ab87",
  "4e9f8db8242b57e72e00bab464a2f4166b694160e621fefd5aae48ea457e373c"
]

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}
async function checkPassword() {
  const enteredPasswordHash = await hashPassword(passwordInput.value); // Hash the entered password
  if (correctPasswordHashes.includes(enteredPasswordHash)) {
    passwordContainer.style.display = 'none';
    mainContent.style.display = 'block';
    errorMessage.textContent = "";
  } else {
    errorMessage.textContent = "Incorrect passkey. Try again.";
    console.log(enteredPasswordHash)
  }
}


