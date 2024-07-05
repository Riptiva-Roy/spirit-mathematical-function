const questions = [
    {
        question: "When starting a new project, what is your primary focus?",
        answers: [
            { text: "Finding a balance between enthusiasm and caution.", value: 'A' },
            { text: "Maximizing potential and looking for ways to expand.", value: 'B' },
            { text: "Structuring it to ensure the best possible outcome.", value: 'C' },
            { text: "Progressing steadily, knowing growth takes time.", value: 'D' },
            { text: "Ensuring every step taken is effective and balanced.", value: 'E' }
        ]
    },
    {
        question: "How do you react to unexpected changes in your routine?",
        answers: [
            { text: "I quickly find a new rhythm to adapt.", value: 'A' },
            { text: "I view them as chances to grow rapidly.", value: 'B' },
            { text: "I analyze the situation to find the best way to optimize my response.", value: 'C' },
            { text: "I accept them as part of a gradual process.", value: 'D' },
            { text: "I handle them directly, ensuring minimal disruption.", value: 'E' }
        ]
    },
    {
        question: "What best describes your approach to personal development?",
        answers: [
            { text: "Embracing the natural highs and lows.", value: 'A' },
            { text: "Focusing on consistent and rapid improvement.", value: 'B' },
            { text: "Striving to achieve an optimal balance in all areas.", value: 'C' },
            { text: "Recognizing that progress is often gradual.", value: 'D' },
            { text: "Valuing the overall journey regardless of the immediate challenges.", value: 'E' }
        ]
    },
    {
        question: "When making decisions, what is your primary consideration?",
        answers: [
            { text: "How it fits into the bigger picture of my life.", value: 'A' },
            { text: "The potential for significant benefits and growth.", value: 'B' },
            { text: "The possible outcomes and selecting the best one.", value: 'C' },
            { text: "The long-term impact and steady progress.", value: 'D' },
            { text: "The immediate effects and maintaining balance.", value: 'E' }
        ]
    },
    {
        question: "What do you value most in your relationships?",
        answers: [
            { text: "The natural ebb and flow of connection and understanding.", value: 'A' },
            { text: "Mutual encouragement and growth.", value: 'B' },
            { text: "Finding and maintaining harmony together.", value: 'C' },
            { text: "Supporting each other through all phases of life.", value: 'D' },
            { text: "Being equally present for each other in all circumstances.", value: 'E' }
        ]
    },
    {
        question: "How do you view challenges or obstacles in your life?",
        answers: [
            { text: "As part of a natural cycle that will balance out.", value: 'A' },
            { text: "As opportunities for significant growth.", value: 'B' },
            { text: "As problems to be optimized for the best outcome.", value: 'C' },
            { text: "As gradual steps that contribute to long-term progress.", value: 'D' },
            { text: "As situations that require direct and balanced handling.", value: 'E' }
        ]
    }
];

const results = {
    A: {
        title: "Sine Function (sin(x))",
        description: "You embody the concept of harmony and balance, illustrating the ebb and flow of life's rhythms. You recognize the cyclical nature of existence, from the changing seasons to the highs and lows of human emotions, and find beauty in the interconnectedness and balance within the universe.",
        image: "images/sine_function.jpg"  // Path to the image for result A
    },
    B: {
        title: "Exponential Function (e^x)",
        description: "You represent the concept of exponential growth and compounding effects. You have the potential for rapid acceleration and advancement in various aspects of life, from personal development to financial investments. You thrive on growth and the pursuit of success.",
        image: "images/exponential_function.jpg"  // Path to the image for result B
    },
    C: {
        title: "Quadratic Function (ax^2 + bx + c)",
        description: "You reflect the notion of growth and optimization, where the function's concavity and vertex represent the journey towards achieving the best possible outcome. You seek balance and equilibrium in life's journey and are driven by finding the optimal solutions to your challenges.",
        image: "images/quadratic_function.jpg"  // Path to the image for result C
    },
    D: {
        title: "Logarithmic Function (log(x))",
        description: "You embody the concept of growth with diminishing returns, emphasizing the need for balance and moderation in pursuit of goals and aspirations. You recognize that progress can be gradual and value the importance of a steady, measured approach.",
        image: "images/logarithmic_function.jpg"  // Path to the image for result D
    },
    E: {
        title: "Absolute Value Function (|x|)",
        description: "You signify the importance of magnitude and distance, emphasizing symmetry and balance in relationships and perceptions. You focus on the equal importance of experiences and the value of direct, straightforward approaches in life.",
        image: "images/absolute_value_function.jpg"  // Path to the image for result E
    }
};

const startButton = document.getElementById('start-button');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const resultImage = document.getElementById('result-image');

let currentQuestionIndex = 0;
let answers = [];

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        showResult();
    }
});

function startQuiz() {
    startButton.classList.add('hide');
    currentQuestionIndex = 0;
    answers = [];
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer.value));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    nextButton.classList.add('hide');
}

function selectAnswer(value) {
    answers.push(value);
    nextButton.classList.remove('hide');
}

function showResult() {
    questionContainer.classList.add('hide');
    const result = calculateResult();
    resultText.innerHTML = `<h3>${result.title}</h3><p>${result.description}</p>`;
    resultImage.src = result.image;
    resultContainer.classList.remove('hide');
}

function calculateResult() {
    const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    answers.forEach(answer => counts[answer]++);
    const maxCount = Math.max(...Object.values(counts));
    const resultKey = Object.keys(counts).find(key => counts[key] === maxCount);
    return results[resultKey];
}
