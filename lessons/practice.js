// Function to shuffle an array of numbers
function shuffle() {
    const shuffled = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let currentIndex = 10, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }
    return shuffled;
}

// Async function to load page data from JSON file
async function loadPage(lessonIndex) {
    try {
        const response = await fetch("prealgebra.json");
        const course = await response.json();
        const page = course[lessonIndex];
        return page;
    } catch (error) {
        console.error("Error!", error);
    }
}

// Function to display the current question page
function displayPage() {
    qorder.shift();
    const questionIndex = qorder[0];
    page = loadPage(lessonIndex);
    page.then((page) => {
        clearAll();
        title.innerText = page.title;
        question.innerText = page.practice[questionIndex].question;
        questions.a.innerText = `a)\u00A0\u00A0${page.practice[questionIndex].options[0].text}`;
        questions.b.innerText = `b)\u00A0\u00A0${page.practice[questionIndex].options[1].text}`;
        questions.c.innerText = `c)\u00A0\u00A0${page.practice[questionIndex].options[2].text}`;
        questions.d.innerText = `d)\u00A0\u00A0${page.practice[questionIndex].options[3].text}`;
        if (qorder.length <= 1) {
            nextQuestion.innerText = "Next Lesson";
            nextQuestion.classList.add("short");
        } else {
            nextQuestion.innerText = "Next Question";
            nextQuestion.classList.remove("short")
        };
    });
}

// Function to clear all answer styles and feedback
function clearAll(){
    questions.a.classList.remove("correct", "incorrect");
    questions.b.classList.remove("correct", "incorrect");
    questions.c.classList.remove("correct", "incorrect");
    questions.d.classList.remove("correct", "incorrect");
    feedback.a.innerText = "";
    feedback.b.innerText = "";
    feedback.c.innerText = "";
    feedback.d.innerText = "";
}

// Function to verify the selected answer and show feedback
let verify = function (number, letter) {
    questionIndex = qorder[0];
    clearAll();
    page.then((page) => {
        if (page.practice[questionIndex].options[number].isCorrect) {
            questions[letter].classList.add("correct");
            isAnswered = true;
            nextQuestion.disabled = false;
        } else {
            questions[letter].classList.add("incorrect");
        }
        feedback[letter].innerText = page.practice[questionIndex].options[number].feedback;
    });
};

// Set localStorage to indicate practice mode
localStorage.setItem("pracorless","practice");

// Get lesson index from URL parameters
const urlvars = new URLSearchParams(window.location.search);
const lessonIndex = parseInt(urlvars.get("li"), 10);
if (isNaN(lessonIndex)) {
    alert("Lesson number is not valid. Going back to lesson 1.");
    window.location.href = "./practice.html?li=0";
}
localStorage.setItem("li", lessonIndex.toString(10));

// Shuffle the question order
let qorder = shuffle();
let isAnswered = false, questionIndex = 0;

// Variable to hold the current page promise
let page;

// Initialize objects for question options and feedback elements
let questions = {}, feedback = {};

// Get DOM elements for title, question, and next button
const title = document.getElementById("title"), question = document.getElementById("question"), nextQuestion = document.getElementById("next-question");

// Assign question option elements
questions.a = document.getElementById("1");
questions.b = document.getElementById("2");
questions.c = document.getElementById("3");
questions.d = document.getElementById("4");

// Assign feedback elements
feedback.a = document.getElementById("feedback-a");
feedback.b = document.getElementById("feedback-b");
feedback.c = document.getElementById("feedback-c");
feedback.d = document.getElementById("feedback-d");

// Display the initial question page
displayPage();

// Add event listener for the next question button
nextQuestion.addEventListener("click", () => {
    loadPage(lessonIndex).then((page) => {
        if (qorder.length > 1) {
            displayPage();
            isAnswered = false;
            nextQuestion.disabled = true;
        } else {
            window.location.href = `./template.html?li=${lessonIndex+1}`;
        }
    });
});