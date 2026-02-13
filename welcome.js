document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", function () {
        startBtn.innerText = "Loading...";
        startBtn.disabled = true;

        setTimeout(function () {
            window.location.href = "personalization.html";
        }, 800);
    });
});
