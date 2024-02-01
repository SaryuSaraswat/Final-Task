
let question_number_element = document.getElementById("question-number");
let question_txt_element = document.getElementById("question-txt");
let option_1_element = document.getElementById("option1");
let option_2_element = document.getElementById("option2");
let option_3_element = document.getElementById("option3");
let option_4_element = document.getElementById("option4");
let next_button = document.getElementById("next-button");
let time_element = document.getElementById("timer");

let currentQuestionNumber = 0;
let score = 0;
let time;
const total_time = 60;
let sec = total_time;
let quizData;

window.onload = function () {
    quizData = JSON.parse(localStorage.getItem('quizData')) || [];
    showQuestion(); 
};

function timer() {
    time_element.innerHTML = sec;
    sec--;
    if (sec == 0) {
        sec = total_time;
        clearInterval(time);
        checkIfScore();
        currentQuestionNumber++;
        showQuestion();
    }
}

function checkIfScore() {
    let optionIdSelected = document.querySelector('input[name=opt]:checked');
    let correctAnswerIndex = quizData[currentQuestionNumber].correctAnswerIndex;
    if (optionIdSelected != null && parseInt(optionIdSelected.value) === correctAnswerIndex) {
        score++;
    }
}

function showQuestion() {
    sec = total_time;
    clearInterval(time);
    timer();
    time = setInterval(timer, 1000);

    document.querySelectorAll("input[name=opt]").forEach(option => option.checked = false);

    if (currentQuestionNumber >= quizData.length) {
        goToResultPage();
    }
     
    question_number_element.innerHTML = (currentQuestionNumber + 1) + ". ";
    question_txt_element.innerHTML = quizData[currentQuestionNumber].question;
    option_1_element.innerHTML = quizData[currentQuestionNumber].options[0];
    option_2_element.innerHTML = quizData[currentQuestionNumber].options[1];
    option_3_element.innerHTML = quizData[currentQuestionNumber].options[2];
    option_4_element.innerHTML = quizData[currentQuestionNumber].options[3];
}

next_button.addEventListener('click', () => {
    checkIfScore();
    currentQuestionNumber++;
    if (currentQuestionNumber >= quizData.length) {
        goToResultPage();
    } else {
        showQuestion();
    }
});

function goToResultPage() {
    currentQuestionNumber = 0;
    localStorage.setItem("score", score);
    location.href = "./resultPage.html";
}



