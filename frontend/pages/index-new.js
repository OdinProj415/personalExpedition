const form = document.getElementById("main");
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    login(name, username, password);
});
async function login(name, username, password) {
    const data = {name: name, username: username, password: password};

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const reply = await response.json();
    if (!reply.oldUser) {
        document.write("Welcome to Algebrators, New Learner");
    } else {
        if (reply.password === "correct") {
            document.write("Welcome back to Algebrators, " + reply.data.name);
        } else {
            const pass = document.getElementById("password");
            pass.style.backgroundColor = "red";
            console.log("incorrect password");
        };
    };
}