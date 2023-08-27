const progressBar = document.querySelector(".progress-bar"),
progressText = document.querySelector(".progress-text");

const progress = (value) => {
    /**added the progress function to manage progress visualization.
     * Calculated precentage based on input value and time.
     */
    const percentage = (value / time) * 100;
    progressBar.style.width = `${percentage}% `;
    progressText.innerHTML = ` ${value} `;

};

let questions = [],
    time = 30,
    score = 0,
    currentQuestion,
    timer;

    //targeting the elements in the homepage
const startButton = document.querySelector(".start"),
numQuestions= document.querySelector("#num-questions"),
category = document.querySelector("#category"),
difficultyLevel = document.querySelector("#difficulty-level"),
timePerQuestion = document.querySelector("#time"),
quiz = document.querySelector(".quiz"),
homepage = document.querySelector(".homepage");

const startQuiz = () => {
    const num =numQuestions.value;
    cat = category.value;
    diff = difficultyLevel.value;


    // Api url for generating questions.
    const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficultyLevel=${diff}&type=multiple`;

    fetch(url)
        .then((res) => res.json())
        .then((date) => {
            questions = data.results;
            console.log(questions);
        });
};



