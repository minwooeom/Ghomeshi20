const quizData = [
    {
        question: "Where was our first date?",
        choices: ["In my bedroom", "ELISA Steakhouse", "Gas Works Park", "Arcade"],
        correct: "Gas Works Park",
        Image: "../imgs/question1.jpg",
        correctMessage: "That was easy... You got it right even with your CTE brain!",
        incorrectMessage: "The correct answer was Gas Works Park. You don't remember our first date? I'm disappointed."
    },
    {
        question: "What bar were you too scared to go into in Leavenworth?",
        choices: ["Rheinhaus", "LIV", "Q Nightclub", "The Loft"],
        correct: "The Loft",
        Image: "../imgs/question2.jpg",
        correctMessage: "Nice you got it right! Usually you remember trauma better than good memories.",
        incorrectMessage: "The correct answer was The Loft. Usually you're supposed to remember trauma better than good memories?"
    },
    {
        question: "Who snores more?",
        choices: ["Samantha", "Minwoo"],
        correct: "Samantha",
        Image: "../imgs/question3.jpg",
        correctMessage: "I'm glad you are humble enough to admit. I'm proud of you.",
        incorrectMessage: "The correct answer is you. Lying is a sin. We have video proof."
    },
    {
        question: "What’s is Min's favorite rogue flavor?",
        choices: ["Citrus", "Berry", "Wintergreen", "I dont do nicotine"],
        correct: "Wintergreen",
        Image: "../imgs/question4.jpg",
        correctMessage: "Good job! You know me so well.",
        incorrectMessage: "The correct answer was Wintergreen. Remember it for the next time you go out and buy me some."
    },
    {
        question: "What is the NYT game Min always beats you at?",
        choices: ["The Mini", "Wordle", "Connections", "None of them"],
        correct: "The Mini",
        Image: "../imgs/question5.jpg",
        correctMessage: "It's actually all of them, but I'll be nice. Now time to redeem yourself.",
        incorrectMessage: "The correct answer was The Mini. It's okay tho. You can redeem yourself."
    }
];


let currentQuestionIndex = 0;
let userAnswer = "";
let isAnswerChecked = false;

// Show the first question on page load
window.onload = showQuestion;

function showQuestion() {
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices');

    // Get the current question
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    // Clear previous choices
    choicesContainer.innerHTML = '';

    // Show choices
    currentQuestion.choices.forEach(choice => {
        const choiceBtn = document.createElement('div');
        choiceBtn.classList.add('choice');
        choiceBtn.textContent = choice;
        choiceBtn.onclick = () => selectChoice(choiceBtn, choice);
        choicesContainer.appendChild(choiceBtn);
    });
}

function selectChoice(choiceBtn, choice) {
    // Clear any previous selections
    document.querySelectorAll('.choice').forEach(choice => {
        choice.classList.remove('active');
    });

    // Highlight the selected choice
    choiceBtn.classList.add('active');
    userAnswer = choice;
}

function checkAnswer() {
    const selectedChoice = document.querySelector('.choice.active');

    if (!selectedChoice) {
        alert('Please select an answer!');
        return;
    }

    // Check if the answer is correct
    const currentQuestion = quizData[currentQuestionIndex];
    let isCorrect = userAnswer === currentQuestion.correct;

    // Show custom alert with result
    showCustomAlert(isCorrect);
}

function showCustomAlert(isCorrect) {
    const customAlert = document.getElementById('custom-alert');
    const alertHeading = document.getElementById('alert-heading');
    const alertImage = document.getElementById('alert-image');

    // Get the current question data
    const currentQuestion = quizData[currentQuestionIndex];

    if (isCorrect) {
        alertHeading.textContent = currentQuestion.correctMessage;
        alertImage.src = currentQuestion.Image; // Use the correct image for the current question
    } else {
        alertHeading.textContent = currentQuestion.incorrectMessage;
        alertImage.src = currentQuestion.Image; // Use the incorrect image for the current question
    }

    customAlert.style.display = 'flex';
}


function closeAlert() {
    const customAlert = document.getElementById('custom-alert');
    customAlert.style.display = 'none';

    // Move to the next question or end quiz
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        window.location.href = 'game.html'; // Redirect to crossword after the last question
    }
}
