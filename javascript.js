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

const submitButton = document.querySelector(".submit");
const nextButton = document.querySelector(".next");

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

    // Add EventListener to each answer

    const answerPart =document.querySelectorAll(".answer");
    answerPart.forEach((answer) => {
        answer.addEventListener("click",() => {
            // if answer not already submitted
            if(!answer.classList.contains("checked")){
                //remove checked from other answer
                answerPart.forEach((answer) => {
                    answer.classList.remove("selected");
                });
                // add selected on currently clicked answer
                answer.classList.add("selected");
                // after any answer is selected enable submit button
                submitButton.disabled = false;
            }
        });
    });

    // after Updating question or loading the question start timer
    time = timePerQuestion.value;
    startTimer(time);
};

const startTimer = (time) => {
    timer = setInterval(() => {
        if(time >= 0) {
        // if timer more than 0 means time remaining
        // move progress
        progress(time);
        time--;
        }else{
            //if time finishes means less than 0
            clearInterval(timer);
            checkAnswer();
        }
    },1000);
};

submitButton.addEventListener("click", () =>{
    checkAnswer();
});

const checkAnswer = () => {
    //first clear interval  when check answer trigger
    clearInterval(timer);

    const selectedAnswer = document.querySelector(".answer.selected");
    //Any answer is selected
    if (selectedAnswer) {
      const answer = selectedAnswer.querySelector(".text").innerHTML;
      console.log(currentQuestion);
      if (answer === questions[currentQuestion - 1].correct_answer) {
        //if answer matched with current question correct answer
        // increase score
        score++;
        selectedAnswer.classList.add("correct");
      } else {
        // if worng selected
        // add wrong class on selected but then also add correct on the correct answer
        // correct added lets add wrong on selected
        selectedAnswer.classList.add("wrong");
        const correctAnswer = document
          .querySelectorAll(".answer")
          .forEach((answer) => {
            if (
              answer.querySelector(".text").innerHTML ===
              questions[currentQuestion - 1].correct_answer
            ) {
            // only add correct class to correct answer
              answer.classList.add("correct");
            }
          });
      }
    } else {
        //answer check will be also triggered when time reaches zero.
        //and when if nothing is selected and time finishes,add correct class on to correct answer.
      const correctAnswer = document
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion - 1].correct_answer
          ) {
            answer.classList.add("correct");
          }
        });

    }
    // Block user to select further answers
    const answersPart = document.querySelectorAll(".answer");
    answersPart.forEach((answer) => {
    answer.classList.add("checked");
    //add checked class on all answer as we check for it when on click answer if its present do nothing.
    //and when checked lets not have a hover effect on checkbox
    });
    //After submit show nextButton for moving on to next question.
    submitButton.style.display = "none";
    nextButton.style.display = "block";

};
// on nextbutton click show next question
nextButton.addEventListener("click",() => {
    nextQuestion();
    //also show submitbutton on next question and hide next button
    submitButton.style.display = "block";
    nextButton.style.display = "none";

})

const nextQuestion = () => {
    //if there is any remaining question.
    if (currentQuestion < questions.length) {
      currentQuestion++;
      //show question
      showQuestion(questions[currentQuestion - 1]);
    } else {
        //if no more question left.
      showScore();
    }
  };

const endScreen = document.querySelector(".end-page"),
    finalScore = document.querySelector(".final-score"),
    totalScore = document.querySelector(".total-score");
const showScore = () => {
     endScreen.classList.remove("hide");
     quiz.classList.add("hide");
    finalScore.innerHTML = score;
     totalScore.innerHTML = `/ ${questions.length}`;
};
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
});

});
