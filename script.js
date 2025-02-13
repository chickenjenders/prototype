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
    puzzleContainer.style.display = 'block';
    errorMessage.textContent = "";
  } else {
    errorMessage.textContent = "Incorrect passkey. Try again.";
    console.log(enteredPasswordHash)
  }
}

const puzzleAnswers = {
  1: [
    "d8198efa3604d164853468608c55efa148bc56e3564d5a30232bf98b8ab43aeb", // Original "clock"
    "93ff9273de4b131b4cc3187f9d59229bf3e2c50626cbc733f6e44e3cd7b47d25"  // Additional "Clock"
  ],
  2: [
    "e7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683",
    "2e81d375eca2ee7fa349412e3f1687ebd7debfe69cc347c729784d25114ff4c6" // "6:00"
  ],
  3: [
    "6820396bce785650e13514da2ec4929ff0c0fddc809f80aec2f623c55c4a3877", // Original "arboretum"
    "f158c80983f0e5c3cb8d38f9d9094289c65b5b08ce83c8f08621025aae246f4e"  // Additional "Arboretum"
  ],
  4: [
    "e6c18fdbe59783dfefef3595cd288bcb7ce912d36854b5e8faaef31235d9031b", // Original "silence"
    "6c61fe498281f4216fd03973936e6f88b0142654174538f4eb41987dfc4c965a"  // Additional "Silence"
  ]
};


async function checkPuzzle(puzzleNumber) {
  const inputField = document.getElementById(`puzzle${puzzleNumber}-input`);
  const userAnswerHash = await hashPassword(inputField.value.trim()); // Hash user input
  const correctAnswerHash = puzzleAnswers[puzzleNumber];

  if (correctAnswerHash.includes(userAnswerHash)) {
    errorMessage.textContent = "";
    document.getElementById(`puzzle${puzzleNumber}`).style.display = 'none';
    if (puzzleNumber < 4) {
      document.getElementById(`puzzle${puzzleNumber + 1}`).style.display = 'block';
    } else {
      puzzleContainer.style.display = 'none';
      mainContent.style.display = 'block';
    }
  } else {
    errorMessage.textContent = "Wrong answer. Try again.";
    console.log(userAnswerHash)
  }
}