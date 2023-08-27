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

