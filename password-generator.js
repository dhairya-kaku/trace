// Go to another page
function goTo(page) {
  window.location.href = page;
}

// Settings
var length = 16;
var options = { upper: true, lower: true, number: true, symbol: true };

// The characters we can pick from
var sets = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  symbol: "!@#$%^&*()-_=+?"
};

// Get a safe random number from 0 to max-1
function randomNumber(max) {
  var list = new Uint32Array(1);
  window.crypto.getRandomValues(list);
  return list[0] % max;
}

// Turn an option on or off
function toggleOption(name) {
  options[name] = !options[name];
  var box = document.getElementById("opt-" + name);
  if (options[name]) {
    box.className = "option on";
  } else {
    box.className = "option";
  }
}

// Make the password longer or shorter
function changeLength(change) {
  length = length + change;
  if (length < 8) { length = 8; }
  if (length > 32) { length = 32; }
  document.getElementById("length").innerHTML = length;
}

// Make a new password
function generatePassword() {
  var allChars = "";
  var letters = [];

  // Take one character from every chosen group
  // so the password always has each type
  for (var name in options) {
    if (options[name]) {
      allChars = allChars + sets[name];
      letters.push(sets[name].charAt(randomNumber(sets[name].length)));
    }
  }

  // If nothing is chosen, ask the user to pick something
  if (allChars === "") {
    document.getElementById("output").value = "";
    document.getElementById("hint").innerHTML = "Please turn on at least one option.";
    return;
  }

  // Fill the rest with random characters
  while (letters.length < length) {
    letters.push(allChars.charAt(randomNumber(allChars.length)));
  }

  // Mix the letters so the first ones are not always in the same order
  for (var i = letters.length - 1; i > 0; i--) {
    var j = randomNumber(i + 1);
    var temp = letters[i];
    letters[i] = letters[j];
    letters[j] = temp;
  }

  document.getElementById("output").value = letters.join("");
  document.getElementById("copy-message").innerHTML = "";

  // Show a small hint about the strength
  var hint = "";
  if (length < 12) {
    hint = "Good. Try 12 or more characters for better safety.";
  } else if (length < 16) {
    hint = "Strong password.";
  } else {
    hint = "Very strong password.";
  }
  document.getElementById("hint").innerHTML = hint;
}

// Copy the password to the clipboard
function copyPassword() {
  var box = document.getElementById("output");
  if (box.value === "") {
    return;
  }
  box.select();
  document.execCommand("copy");
  document.getElementById("copy-message").innerHTML = "Copied!";
}

// Make a password when the page opens
generatePassword();
