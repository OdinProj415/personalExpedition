function restore() {
            const pracorless = localStorage.getItem("pracorless");
            const li = localStorage.getItem("li");
            if (pracorless == "practice") {
                window.location.href = `./practice.html?li=${parseInt(li, 10)}`;
            } else if (pracorless == "lesson") {
                window.location.href = `./lesson.html?li=${parseInt(li, 10)}`;
            };
        }
        const name = localStorage.getItem("name");
        if (name != null) {
            const welcome = document.getElementById("welcome");
            welcome.innerText = "Welcome, " + name 
        } else {
            localStorage.setItem("name", JSON.stringify(prompt("What's your name?", "John")));
        }