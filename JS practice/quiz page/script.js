const quiz = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Paris", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "What is the largest country in the world?",
        choices: ["China", "Russia", "Canada", "USA"],
        answer: "Russia"
    },
    {
        question: "What is the highest mountain in the world?",
        choices: ["Mount Everest", "K2", "Makalu", "Lhotse"],
        answer: "Mount Everest"
    },
    {
        question: "What is the largest ocean in the world?",
        choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: "Pacific"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function renderQuiz() {
    const questionEl = document.getElementById("question");
    const choicesEl = document.getElementById("choices");

    questionEl.textContent = quiz[currentQuestionIndex].question;

    quiz[currentQuestionIndex].choices.forEach(choice => {
        const li = document.createElement("li");
        li.textContent = choice;
        li.addEventListener("click", () => {
            handleChoiceClick(choice);
        });
        choicesEl.appendChild(li);
    });
}

function handleChoiceClick(choice) {
    if (choice === quiz[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quiz.length) {
        renderQuiz();
    } else {
        showResults();
    }
}

function showResults() {
    const quizEl = document.getElementById("quiz");
    quizEl.innerHTML = `<h2>Quiz Complete!</h2><p>Your score is ${score}/${quiz.length}</p>`;
}

renderQuiz();

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", () => {
    const selectedChoice = document.querySelector("li.selected");
    if (selectedChoice) {
        const choiceText = selectedChoice.textContent;
        handleChoiceClick(choiceText);
    }
});

const choicesEl = document.getElementById("choices");
choicesEl.addEventListener("click", e => {
    const selectedChoice = e.target;
    if (selectedChoice && selectedChoice.nodeName === "LI") {
        const selectedChoices = choicesEl.querySelectorAll(".selected");
        selectedChoices.forEach(choice => {
            choice.classList.remove("selected");
        });
        selectedChoice.classList.add("selected");
    }
});
