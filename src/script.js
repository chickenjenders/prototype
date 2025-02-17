import { Terminal } from '@xterm/xterm';

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

document.addEventListener('DOMContentLoaded', (event) => {
  // Initialize xterm.js terminal and fix container id
  const terminalContainer = document.getElementById('terminal-container');
  const term = new Terminal({
    cols: 80,
    rows: 12,
    cursorBlink: true
  });
  console.log(Terminal);
  term.open(terminalContainer);

  // Set up a prompt mechanism
  let commandBuffer = "";
  const prompt = () => {
    term.write('\r\n$ ');
  };

  // Write a welcome message
  term.writeln('Terminal Hacking Demo');
  prompt();

  // Listen for data input
  term.onData(data => {
    // Handle backspace
    if (data === '\u007F') { // Backspace character
      if (commandBuffer.length > 0) {
        commandBuffer = commandBuffer.slice(0, -1);
        term.write('\b \b');
      }
      return;
    }

    // When user presses Enter
    if (data === '\r') {
      // Process the command in commandBuffer
      processCommand(commandBuffer.trim());
      commandBuffer = "";
      prompt();
    } else {
      commandBuffer += data;
      term.write(data);
    }
  });

  function processCommand(cmd) {
    if (cmd.toLowerCase() === 'reveal') {
      // Reveal the image gallery by changing its display property
      const gallery = document.querySelector('.image-gallery');
      if (gallery) {
        gallery.style.display = 'flex';  // Or any appropriate display style
        term.writeln('\r\n[INFO] Gallery Revealed!');
      } else {
        term.writeln('\r\n[ERROR] Gallery not found.');
      }
    } else {
      term.writeln(`\r\n[ERROR] Unknown command: ${cmd}`);
    }
  }

  document.getElementById('password-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents the default form submission
    checkPassword();
  });
});
