// Go to another page
function goTo(page) {
  window.location.href = page;
}

// A small list of very common passwords
var commonPasswords = [
  "password", "123456", "12345678", "123456789", "qwerty", "abc123",
  "password1", "admin", "letmein", "welcome", "iloveyou", "111111"
];

// Show or hide the password
function togglePassword() {
  var box = document.getElementById("password");
  var button = document.getElementById("show-btn");
  if (box.type === "password") {
    box.type = "text";
    button.innerHTML = "Hide";
  } else {
    box.type = "password";
    button.innerHTML = "Show";
  }
}

// Mark one checklist line as passed (ok) or failed (bad)
function setRule(id, passed, text) {
  var line = document.getElementById(id);
  if (passed) {
    line.className = "rule ok";
    line.innerHTML = "Yes: " + text;
  } else {
    line.className = "rule bad";
    line.innerHTML = "No: " + text;
  }
}

// Turn seconds into easy words
function makeTimeText(seconds) {
  if (seconds < 1) { return "Instantly"; }
  if (seconds < 60) { return Math.round(seconds) + " seconds"; }
  if (seconds < 3600) { return Math.round(seconds / 60) + " minutes"; }
  if (seconds < 86400) { return Math.round(seconds / 3600) + " hours"; }
  if (seconds < 31536000) { return Math.round(seconds / 86400) + " days"; }
  if (seconds < 3153600000) { return Math.round(seconds / 31536000) + " years"; }
  return "Centuries or more";
}

// This runs every time you type
function checkPassword() {
  var password = document.getElementById("password").value;
  var length = password.length;

  // Find out what is inside the password
  var hasLower = /[a-z]/.test(password);
  var hasUpper = /[A-Z]/.test(password);
  var hasNumber = /[0-9]/.test(password);
  var hasSymbol = /[^a-zA-Z0-9]/.test(password);

  // Update the checklist
  setRule("rule-8", length >= 8, "At least 8 characters");
  setRule("rule-12", length >= 12, "At least 12 characters");
  setRule("rule-lower", hasLower, "A small letter (a-z)");
  setRule("rule-upper", hasUpper, "A capital letter (A-Z)");
  setRule("rule-number", hasNumber, "A number (0-9)");
  setRule("rule-symbol", hasSymbol, "A symbol like ! @ # ?");

  // Nothing typed yet
  if (length === 0) {
    document.getElementById("meter-fill").style.width = "0%";
    document.getElementById("level").innerHTML = "Start typing to see the result";
    document.getElementById("level").style.color = "#16222f";
    document.getElementById("message").innerHTML = "";
    document.getElementById("crack-time").innerHTML = "-";
    return;
  }

  // Count points (the highest score is 7)
  var score = 0;
  if (length >= 8) { score = score + 1; }
  if (length >= 12) { score = score + 1; }
  if (length >= 16) { score = score + 1; }
  if (hasLower) { score = score + 1; }
  if (hasUpper) { score = score + 1; }
  if (hasNumber) { score = score + 1; }
  if (hasSymbol) { score = score + 1; }

  // Short passwords can never be strong
  if (length < 8 && score > 2) {
    score = 2;
  }

  // Very common passwords are always very weak
  var isCommon = commonPasswords.indexOf(password.toLowerCase()) !== -1;
  if (isCommon) {
    score = 0;
  }

  // Pick the words and the color
  var levelText = "";
  var color = "";
  var message = "";

  if (score <= 2) {
    levelText = "Very weak";
    color = "#d93025";
    message = "Anyone can guess this quickly. Make it longer and mix different characters.";
  } else if (score === 3) {
    levelText = "Weak";
    color = "#f07d1a";
    message = "Better, but still easy to crack. Add more characters.";
  } else if (score <= 5) {
    levelText = "Medium";
    color = "#d19a00";
    message = "Not bad. Make it longer and use all four character types.";
  } else if (score === 6) {
    levelText = "Strong";
    color = "#5aa626";
    message = "Good password. A few more characters will make it even better.";
  } else {
    levelText = "Very strong";
    color = "#0a7a3c";
    message = "Excellent! Remember to use a different password on every account.";
  }

  if (isCommon) {
    message = "This is one of the most common passwords in the world. Never use it.";
  }

  // Show the result on the page
  var fill = document.getElementById("meter-fill");
  fill.style.width = (score / 7 * 100) + "%";
  fill.style.background = color;

  var level = document.getElementById("level");
  level.innerHTML = levelText;
  level.style.color = color;

  document.getElementById("message").innerHTML = message;

  // Guess the time to crack
  // pool = how many different characters could be used
  var pool = 0;
  if (hasLower) { pool = pool + 26; }
  if (hasUpper) { pool = pool + 26; }
  if (hasNumber) { pool = pool + 10; }
  if (hasSymbol) { pool = pool + 32; }

  var tries = Math.pow(pool, length);
  var seconds = tries / 10000000000;
  if (isCommon) { seconds = 0; }

  document.getElementById("crack-time").innerHTML = makeTimeText(seconds);
}

// Fill the checklist when the page opens
checkPassword();
