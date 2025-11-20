// ==============================
// 1. Quiz Data (Change these!)
// ==============================
const quizData = [
  {
    question:
      "Which of the following is the correct way to print a message to the browser console?",
    options: [
      'console.log("Hello, world!");',
      'print("Hello, world!");',
      'log.console("Hello, world!");',
      'echo("Hello, world!");',
    ],
    answer: 0,
  },
  {
    question:
      "Which operator checks both value AND type equality in JavaScript?",
    options: ["==", "===", "=", "!="],
    answer: 1,
  },
  {
    question: "What is the correct way to create an array in JavaScript?",
    options: [
      'let colors = "red, blue, green";',
      'let colors = ["red", "blue", "green"];',
      "let colors = (red, blue, green);",
      "let colors = {red, blue, green};",
    ],
    answer: 1,
  },
  {
    question: "What does JSON stand for in JavaScript?",
    options: [
      "JavaScript Object Number",
      "Java Standard Output Notation",
      "JavaScript Online Network",
      "JavaScript Object Notation",
    ],
    answer: 3,
  },
  {
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Automated Program Instruction",
      "Application Process Integration",
      "Advanced Programming Input",
    ],
    answer: 0,
  },
  {
    question: "What does AJAX stand for?",
    options: [
      "Asynchronous JavaScript and XML",
      "All Java Applications eXtended",
      "Advanced Java Access eXchange",
      "Asynchronous JSON and XHTML",
    ],
    answer: 0,
  },
];

// 💡 Your turn later:
// Replace these questions with your own 3–5 JavaScript questions.
// Just keep the same structure: question, options (array), answer (index).

// ==============================
// 2. State Variables
// ==============================
let currentQuestionIndex = 0;
let score = 0;

// ==============================
// 3. DOM Elements
// ==============================
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

// ==============================
// 4. Load a Question
// ==============================
function loadQuestion() {
  // Clear old options and reset Next button
  resetState();

  // Get current question object
  const currentQuestion = quizData[currentQuestionIndex];

  // Show question text
  const questionNumber = currentQuestionIndex + 1;
  const totalQuestions = quizData.length;
  questionContainer.textContent = `Question ${questionNumber} of ${totalQuestions}: ${currentQuestion.question}`;

  // 🔹 Change button text on last question
  if (currentQuestionIndex === totalQuestions - 1) {
    nextButton.textContent = "Submit Quiz";
  } else {
    nextButton.textContent = "Next Question";
  }

  // Create a button for each option
  currentQuestion.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.textContent = optionText;
    button.classList.add("option-button");

    // When an option is clicked, handle the answer
    button.addEventListener("click", () => selectOption(index));

    // Add button to options container
    optionsContainer.appendChild(button);
  });
}

// ==============================
// 5. Reset state for new question
// ==============================
function resetState() {
  // Clear previous options
  optionsContainer.innerHTML = "";

  // Disable the Next button until user selects an option
  nextButton.disabled = true;
}

// ==============================
// 6. Handle User's Choice
// ==============================
function selectOption(selectedIndex) {
  const currentQuestion = quizData[currentQuestionIndex];
  const correctIndex = currentQuestion.answer;

  // Get all option buttons
  const buttons = optionsContainer.querySelectorAll("button");

  // Disable all buttons so user can't change answer
  buttons.forEach((button, index) => {
    button.disabled = true;

    // If this is the correct answer, mark it green
    if (index === correctIndex) {
      button.classList.add("correct");
    }

    // If this is the one the user clicked and it's wrong, mark red
    if (index === selectedIndex && selectedIndex !== correctIndex) {
      button.classList.add("incorrect");
    }
  });

  // If user was correct, update score
  if (selectedIndex === correctIndex) {
    score++;
  }

  // 🔹 Change button text depending on whether this is the last question
  const totalQuestions = quizData.length;
  if (currentQuestionIndex === totalQuestions - 1) {
    nextButton.textContent = "Submit Quiz";
  } else {
    nextButton.textContent = "Next Question";
  }

  // Allow moving to the next question (or submit)
  nextButton.disabled = false;
}

// ==============================
// 7. Show Final Score
// ==============================
function showScore() {
  // Hide quiz, show score
  quizContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");

  scoreText.textContent = `You scored ${score} out of ${quizData.length}.`;
}

// ==============================
// 8. Handle Next Question Button
// ==============================
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  // If there are more questions, load next
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    // Otherwise, show final score
    showScore();
  }
});

// ==============================
// 9. Restart Quiz
// ==============================
restartButton.addEventListener("click", () => {
  // Reset state
  currentQuestionIndex = 0;
  score = 0;

  // Show quiz again, hide score screen
  scoreContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  // Load first question
  loadQuestion();
});

// ==============================
// 10. Start the quiz when page loads
// ==============================
loadQuestion();
