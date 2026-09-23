const darkButton = document.getElementById("darkMode");

if (darkButton) {

    darkButton.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            darkButton.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            darkButton.textContent = "🌙";
        }

    });

}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");

    if (darkButton) {
        darkButton.textContent = "☀️";
    }
}

const menuButton = document.querySelector(".logo");

if (menuButton) {

    menuButton.addEventListener("click", () => {

        const menu = document.querySelector("#menu");

        if (menu) {
            menu.classList.toggle("active");
        }

    });

}