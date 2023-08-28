document.addEventListener("DOMContentLoaded", () => {

const progressBar = document.querySelector(".progress-bar"),
progressText = document.querySelector(".progress-text");

const progress = (value) => {
    /**added the progress function to manage progress visualization.
     * Calculated precentage based on input value and time.
     */
    const percentage = (value / time) * 100;
    progressBar.style.width = `${percentage}% `;
    progressText.innerHTML = `${value}`;

};

let questions = [],
    time = 30,
    score = 0,
    currentQuestion,
    timer;

    //targeting the elements in the homepage
const startButton = document.querySelector(".btn-start"),
numQuestions= document.querySelector("#num-questions"),
category = document.querySelector("#category"),
difficultyLevel = document.querySelector("#difficulty-level"),
timePerQuestion = document.querySelector("#time"),
quiz = document.querySelector(".quiz"),
homepage = document.querySelector(".homepage");

const startQuiz = () => {
    const num = numQuestions.value;
    cat = category.value;
    diff = difficultyLevel.value;


    // Api url for generating questions.

    const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficultyLevel=${diff}&type=multiple`;
    /**URL for fetching questions from an API.  
     * includes query parameters that define the number of questions to fetch (num), the category of questions (cat), 
     * the difficulty level of questions (diff), and the type of questions (multiple-choice in this case). */


    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            // Code to handle the fetched data
            questions = data.results;  //  manipulate the fetched questions data
            console.log(questions);
            homepage.classList.add("hide");
            quiz.classList.remove("hide");
            currentQuestion = 1;
            showQuestion(questions[0]);
        });
};

startButton.addEventListener("click", startQuiz);

const showQuestion = (question) => {
    const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper"),
    questionNumber = document.querySelector(".question-number");

    questionText.innerHTML =question.question;
};

});
