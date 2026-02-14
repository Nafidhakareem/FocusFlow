document.addEventListener("DOMContentLoaded", function () {
    const timeCards = document.querySelectorAll(".time-card");
    const timeOptionsContainer = document.getElementById("timeoptions");
    const addTimeBtn = document.getElementById("addTimeBtn");
    const customTimeInput = document.getElementById("customTime");

    // Function to handle time selection
    function selectTime(card) {
        const selectedTime = card.getAttribute("data-time");

        // Save selected time to localStorage
        localStorage.setItem("timeSlot", selectedTime);

        // Visual feedback
        card.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
        card.style.transform = "scale(1.05)";

        // Redirect to Session Page after short delay
        setTimeout(() => {
            window.location.href = "session.html";
        }, 400);
    }

    // Add click event to existing time cards
    timeCards.forEach(card => {
        card.addEventListener("click", function () {
            selectTime(card);
        });
    });

    // Add custom time dynamically
    addTimeBtn.addEventListener("click", function () {
        console.log("Add Time button clicked");
        const customTime = parseInt(customTimeInput.value);
        if (isNaN(customTime) || customTime <= 0) {
            alert("Please enter a valid time in minutes.");
            return;
        }

        // Create new time card
        const card = document.createElement("div");
        card.classList.add("time-card");
        card.setAttribute("data-time", customTime);
        card.textContent = `${customTime} Minutes`;

        // Add click event to the new card
        card.addEventListener("click", function () {
            selectTime(card);
        });

        // Append to container
        timeOptionsContainer.appendChild(card);

        // Clear input
        customTimeInput.value = "";
    });
});
