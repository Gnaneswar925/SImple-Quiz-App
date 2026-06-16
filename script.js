const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyper Transfer Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
        ]
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        answers: [
            { text: "<link>", correct: false },
            { text: "<a>", correct: true },
            { text: "<href>", correct: false },
            { text: "<url>", correct: false },
        ]
    },
    {
        question: "Which CSS property is used to change text color?",
        answers: [
            { text: "font-color", correct: false },
            { text: "text-color", correct: false },
            { text: "color", correct: true },
            { text: "background-color", correct: false },
        ]
    },
    {
        question: "Which language is primarily used to add interactivity to web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false },
        ]
    },
    {
        question: "Which HTML tag is used to insert an image?",
        answers: [
            { text: "<image>", correct: false },
            { text: "<img>", correct: true },
            { text: "<picture>", correct: false },
            { text: "<src>", correct: false },
        ]
    },
    {
        question: "Which CSS property controls the size of text?",
        answers: [
            { text: "font-size", correct: true },
            { text: "text-size", correct: false },
            { text: "font-style", correct: false },
            { text: "text-style", correct: false },
        ]
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: [
            { text: "variable x;", correct: false },
            { text: "v x;", correct: false },
            { text: "let x;", correct: true },
            { text: "declare x;", correct: false },
        ]
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            { text: "<!-- -->", correct: false },
            { text: "//", correct: true },
            { text: "**", correct: false },
            { text: "##", correct: false },
        ]
    },
    {
        question: "Which HTML element is used for the largest heading?",
        answers: [
            { text: "<heading>", correct: false },
            { text: "<h6>", correct: false },
            { text: "<head>", correct: false },
            { text: "<h1>", correct: true },
        ]
    },
    {
        question: "Which CSS property is used to add space inside an element's border?",
        answers: [
            { text: "margin", correct: false },
            { text: "padding", correct: true },
            { text: "border-spacing", correct: false },
            { text: "spacing", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

// Fisher-Yates Shuffle
function getRandomQuestions(arr, count) {
    const shuffled = [...arr];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    // Select 4 random questions
    selectedQuestions = getRandomQuestions(questions, 4);

    nextButton.textContent = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.textContent =
        questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");

        // Use textContent so tags like <a> and <img> appear as text
        button.textContent = answer.text;

        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();

    questionElement.textContent =
        `You scored ${score} out of ${selectedQuestions.length}!`;

    nextButton.textContent = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < selectedQuestions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();