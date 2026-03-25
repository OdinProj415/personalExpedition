// Async function to load page data from JSON file
async function loadPage(lessonIndex) {
    try {
        const response = await fetch("prealgebra.json");
        const course = await response.json();
        const page = course[lessonIndex];
        console.log(`Content: \n\n ${page.content} \n\n\nTitle: \n\n ${page.title}`);
        console.log(page);
        titledoc.innerHTML = page.title;
        lessondoc.innerHTML = page.content;
        return page;
    } catch (error) {
        console.error("Error!", error);
    }
}

// Function to redirect to a specific lesson
function redirect(lessonIndex) {
    console.log(lessonIndex);
    if (!(lessonIndex >= 0 && lessonIndex <= 10)) {
        document.write("Redirecting...");
        lessonIndex = 0;
    }
    window.location.href = `./template.html?li=${lessonIndex}`;
}

// Function to start practice for the lesson
function doPractice(lessonIndex) {
    console.log(lessonIndex);
    if (lessonIndex < 0 || lessonIndex > 3) {
        lessonIndex = 0;
        document.write("Redirecting to first lesson...");
        window.location.href = `./template.html?li=0`;
    }
    window.location.href = `./practice.html?li=${lessonIndex}`;
}

// Function to go to the next lesson
function goToNextLesson() {
    redirect(lessonIndex + 1);
}

// Function to go to the previous lesson
function goToPrevLesson() {
    redirect(lessonIndex - 1);
}

// Function to start practice
function startPractice() {
    doPractice(lessonIndex);
}

// Get DOM elements for title and content
let titledoc = document.getElementById("title");
let lessondoc = document.getElementById("content-block");

// Clear localStorage and set mode to lesson
localStorage.clear();
localStorage.setItem("pracorless","lesson");

// Get lesson index from URL parameters
const urlvars = new URLSearchParams(window.location.search);
const lessonIndex = parseInt(urlvars.get("li"), 10);
localStorage.setItem("li", lessonIndex.toString(10));

// Load the page content
loadPage(lessonIndex);