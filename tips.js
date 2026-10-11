// Go to another page
function goTo(page) {
  window.location.href = page;
}

// All the tips
var tips = [
  { title: "Use at least 12 characters. 16 is even better.", why: "Every extra character makes guessing much harder." },
  { title: "Use a different password for every account.", why: "If one site leaks your password, your other accounts stay safe." },
  { title: "Use a password manager.", why: "You only need to remember one strong master password." },
  { title: "Turn on two-factor authentication (2FA).", why: "A stolen password alone will not open your account." },
  { title: "Never share your password or OTP code.", why: "Real companies will never ask you for them." },
  { title: "Check a link before you click it.", why: "Fake links are the most common trick." },
  { title: "Keep your phone and computer updated.", why: "Updates fix holes that attackers use." },
  { title: "Lock your screen on every device.", why: "It stops other people from using a lost or unattended device." },
  { title: "Back up your important files.", why: "You can get them back after a crash or ransomware." },
  { title: "Avoid banking on public Wi-Fi.", why: "Other people on the same network may spy on you." }
];

// This list remembers which tips are done (true or false)
var done = [];
for (var i = 0; i < tips.length; i++) {
  done.push(false);
}

// Draw all tips on the page
function showTips() {
  var html = "";
  var count = 0;

  for (var i = 0; i < tips.length; i++) {
    var className = "tip";
    var mark = "";
    if (done[i]) {
      className = "tip done";
      mark = "&#10003;";
      count = count + 1;
    }
    html = html +
      '<div class="' + className + '" onclick="toggleTip(' + i + ')">' +
        '<div class="tip-box">' + mark + '</div>' +
        '<div>' +
          '<div class="tip-title">' + tips[i].title + '</div>' +
          '<div class="tip-why">' + tips[i].why + '</div>' +
        '</div>' +
      '</div>';
  }

  document.getElementById("tip-list").innerHTML = html;
  document.getElementById("progress-text").innerHTML = count + " of " + tips.length + " done";
  document.getElementById("progress-fill").style.width = (count / tips.length * 100) + "%";

  if (count === tips.length) {
    document.getElementById("done-message").innerHTML = "Great job! You follow all the tips.";
  } else {
    document.getElementById("done-message").innerHTML = "";
  }
}

// Mark a tip as done or not done
function toggleTip(number) {
  done[number] = !done[number];
  showTips();
}

// Clear everything
function resetTips() {
  for (var i = 0; i < done.length; i++) {
    done[i] = false;
  }
  showTips();
}

showTips();
