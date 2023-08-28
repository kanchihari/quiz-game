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


    // Creating an array of answers, combining incorrect answers and the correct answer

    const answers = [
        ...question.incorrect_answers,
        question.correct_answer.toString(),
    ];
    
    //correct answer will be always at the last
    // Shuffling the 'answers' array to randomize the order of answers.

      answersWrapper.innerHTML = "";
      answers.sort(() => Math.random() - 0.5);
      answers.forEach((answer) => {
        answersWrapper.innerHTML += `
                      <div class="answer ">
                <span class="text">${answer}</span>
                <span class="checkbox">
                  <i class="fas fa-check"></i>
                </span>
              </div>
            `;
      });

    // Update the question number display on the quizpage
    //shows the current question number out of the total number of questions.
    
    questionNumber.innerHTML = ` Question <span class="current">${
        questions.indexOf(question) + 1
      }</span>
                <span class="total">/${questions.length}</span>`;
};

});
