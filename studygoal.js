document.addEventListener("DOMContentLoaded", function () {
    const goalCards = document.querySelectorAll(".goal-card");

    goalCards.forEach(card => {
        card.addEventListener("click", function () {
            const selectedGoal = card.getAttribute("data-goal");

            // Save selected goal to localStorage
            localStorage.setItem("studyGoal", selectedGoal);

            // Optional: add visual feedback
            card.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
            card.style.transform = "scale(1.05)";

            // Redirect to Time Slot Page after short delay
            setTimeout(() => {
                window.location.href = "timeslot.html";
            }, 400);
        });
    });
});
