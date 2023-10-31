const quiz = [{
    question: "What is the capital of Australia?", 
    choices: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    answer: "Canberra"
},
{
    question: "What is the currency of Japan?",
    choices: ["Yen", "Dollar", "Euro", "Pound"],
    answer: "Yen"
},
{
    question: "What is the largest planet in our solar system?",
    choices: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Jupiter"
},
{
    question: "What is the smallest country in the world?",
    choices: ["Monaco", "Vatican City", "Liechtenstein", "San Marino"],
    answer: "Vatican City"
},
{
    question: "What is the national animal of Canada?",
    choices: ["Moose", "Beaver", "Polar Bear", "Bald Eagle"],
    answer: "Beaver"
},
{
    question: "What is the highest waterfall in the world?",
    choices: ["Angel Falls", "Victoria Falls", "Niagara Falls", "Iguazu Falls"],
    answer: "Angel Falls"
},
{
    question: "What is the name of the first man to walk on the moon?",
    choices: ["Neil Armstrong", "Buzz Aldrin", "Alan Shepard", "Yuri Gagarin"],
    answer: "Neil Armstrong"
},
{
    question: "What is the largest bird in the world?",
    choices: ["Ostrich", "Condor", "Emu", "Albatross"],
    answer: "Ostrich"
},
{
    question: "What is the most spoken language in the world?",
    choices: ["English", "Spanish", "Mandarin", "Arabic"],
    answer: "Mandarin"
},
{
    question: "What is the chemical symbol for gold?",
    choices: ["Ag", "Cu", "Au", "Fe"],
    answer: "Au"
}
];


const selectedAnswers = [];
let score = 0;
const quizcont = document.querySelector('.quiz-container');

function render(index) {
    let questionid = document.createElement("div");
    questionid.setAttribute('class', 'qnid');
    questionid.id = "quiz" + index;

    let quizno = document.createElement("h2");
    quizno.textContent = "Quiz number" + (index + 1);

    let question = document.createElement("p");
    question.setAttribute('class', 'qn');
    question.id = "question" + index;
    question.textContent = quiz[index].question;

    let choices = document.createElement("div");
    choices.setAttribute('class', 'mcq')
    choices.id = "choices" + index;

    for (let j = 0; j < quiz[index].choices.length; j++) {
        let choice = document.createElement("input");
        choice.type = "radio";
        choice.name = "radio-group" + index;
        choice.id = "radio-btn" + j + "-" + index;
        choice.value = quiz[index].choices[j];

        let label = document.createElement("label");
        label.setAttribute("for", choice.id);
        label.textContent = quiz[index].choices[j];

        choice.addEventListener('change', (event) => {
            selectedAnswers[index] = event.target.value;
        });

        choices.appendChild(choice);
        choices.appendChild(label);
    }
    questionid.appendChild(quizno);
    questionid.appendChild(question);
    questionid.appendChild(choices);
    quizcont.appendChild(questionid);
}

for (let index = 0; index < quiz.length; index++) {
    render(index);
}

const btn = document.querySelector('button');
btn.addEventListener('click', (event) => {
    event.preventDefault();

    let score = 0;

    for (let k = 0; k < selectedAnswers.length; k++) {
        if (selectedAnswers[k] == quiz[k].answer) {
            score++;
        }
    }

    const result = document.querySelector('.score');
    result.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = 'Your Final Answer is :'
    const h3 = document.createElement('h3');
    h3.textContent = score + '/' + quiz.length;

    result.appendChild(h2);
    result.appendChild(h3);
});
