// Go to another page
function goTo(page) {
  window.location.href = page;
}

// A list of simple security facts
var facts = [
  "A long password is harder to crack than a short one, even if the short one has symbols.",
  "Many people use the same password on many sites. This is risky.",
  "Phishing is one of the most common ways attackers trick people.",
  "Two-factor authentication adds a second lock to your account.",
  "Software updates often fix security holes that attackers can use.",
  "A password manager can create and remember strong passwords for you."
];

var factNumber = 0;

// Show one fact on the page
function showFact() {
  document.getElementById("fact").innerHTML = facts[factNumber];
  factNumber = factNumber + 1;
  if (factNumber >= facts.length) {
    factNumber = 0;
  }
}

// Show the first fact when the page opens
showFact();
