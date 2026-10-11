// Go to another page
function goTo(page) {
  window.location.href = page;
}

// All the questions
// "answer" is the number of the right option (the first option is 0)
var questions = [
  {
    question: "Which password is the strongest?",
    options: ["password123", "Trace2024", "river-LANTERN-47-cobalt!", "qwerty"],
    answer: 2,
    why: "It is long and mixes letters, numbers and symbols."
  },
  {
    question: "What is phishing?",
    options: ["A type of antivirus", "A fake message that tries to steal your information", "A fast internet connection", "A password manager"],
    answer: 1,
    why: "Phishing messages pretend to come from a real company or person."
  },
  {
    question: "What does two-factor authentication (2FA) add?",
    options: ["A longer password", "Faster login", "Free storage", "A second step to prove it is you"],
    answer: 3,
    why: "Even if someone steals your password, they still need the second step."
  },
  {
    question: "Is it safe to use the same password on many sites?",
    options: ["Yes, it is easier to remember", "No, one leak can open all your accounts", "Only for small sites", "Yes, if it is long"],
    answer: 1,
    why: "Attackers try leaked passwords on many other sites."
  },
  {
    question: "A text says: 'Your bank account is locked. Click this link.' What should you do?",
    options: ["Click the link and log in quickly", "Reply with your password", "Ignore the link and contact your bank using its official app or number", "Forward it to your friends"],
    answer: 2,
    why: "Never trust links in surprise messages. Use the official app or number."
  },
  {
    question: "Why should you update your software?",
    options: ["It changes the colors", "It uses more battery", "It fixes security holes", "There is no reason"],
    answer: 2,
    why: "Updates close holes that attackers can use."
  }
];

var current = 0;     // the number of the question we are on
var score = 0;       // how many answers are right
var answered = false; // did the user already choose an answer?

// Start (or restart) the quiz
function startQuiz() {
  current = 0;
  score = 0;
  document.getElementById("quiz-box").style.display = "block";
  document.getElementById("result-box").style.display = "none";
  showQuestion();
}

// Show the current question
function showQuestion() {
  answered = false;
  var q = questions[current];

  document.getElementById("question-count").innerHTML = "Question " + (current + 1) + " of " + questions.length;
  document.getElementById("question").innerHTML = q.question;
  document.getElementById("feedback").innerHTML = "";
  document.getElementById("next-btn").style.display = "none";

  var html = "";
  for (var i = 0; i < q.options.length; i++) {
    html = html + '<div class="answer" id="answer-' + i + '" onclick="chooseAnswer(' + i + ')">' + q.options[i] + '</div>';
  }
  document.getElementById("answers").innerHTML = html;
}

// The user clicked an answer
function chooseAnswer(number) {
  if (answered) {
    return;
  }
  answered = true;

  var q = questions[current];
  var feedback = document.getElementById("feedback");

  if (number === q.answer) {
    score = score + 1;
    document.getElementById("answer-" + number).className = "answer correct";
    feedback.innerHTML = "Correct! " + q.why;
    feedback.style.color = "#0a7a3c";
  } else {
    document.getElementById("answer-" + number).className = "answer wrong";
    document.getElementById("answer-" + q.answer).className = "answer correct";
    feedback.innerHTML = "Not quite. " + q.why;
    feedback.style.color = "#b3261e";
  }

  // Change the button text on the last question
  var button = document.getElementById("next-btn");
  if (current === questions.length - 1) {
    button.innerHTML = "See my result";
  } else {
    button.innerHTML = "Next question";
  }
  button.style.display = "inline-block";
}

// Go to the next question or show the result
function nextQuestion() {
  current = current + 1;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// Show the final score
function showResult() {
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result-box").style.display = "block";
  document.getElementById("score").innerHTML = score + " / " + questions.length;

  var text = "";
  if (score === questions.length) {
    text = "Perfect! You really know how to stay safe online.";
  } else if (score >= 4) {
    text = "Well done! You know the basics. Read the tips to learn the rest.";
  } else if (score >= 2) {
    text = "Good start. Visit the threats and tips pages and try again.";
  } else {
    text = "Do not worry. Read the safety tips and try again. You will improve fast.";
  }
  document.getElementById("result-text").innerHTML = text;
}

startQuiz();
