document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("startSessionBtn");
    const timerDisplay = document.getElementById("timerDisplay");
    const currentTask = document.getElementById("currentTask");
    const sessionInfo = document.getElementById("sessionInfo");
    const timerSound = document.getElementById("timerSound");

    // Retrieve data from localStorage
    const timeSlot = parseInt(localStorage.getItem("timeSlot")) || 25; // default 25 min
    const hobbiesData = JSON.parse(localStorage.getItem("personalizationData")) || { hobbies: ["walking", "stretching"] };

    // Generate a simple study plan with pre-planned breaks
    function generateStudyPlan(timeSlotMinutes, hobbies) {
        const plan = [];
        // Simple logic: 5 min break every 25% of time
        const studyBlock = Math.floor(timeSlotMinutes * 0.8); // 80% study
        const breakBlock = Math.floor(timeSlotMinutes * 0.2); // 20% break

        // Split breaks into 2 parts if more than 20 min
        const breakMinutes = breakBlock > 10 ? breakBlock / 2 : breakBlock;

        plan.push({ type: "study", duration: studyBlock, description: "Focus on your study goal." });

        // Personalized break
        if (hobbies.length > 0) {
            const hobby = hobbies[Math.floor(Math.random() * hobbies.length)];
            plan.push({ type: "break", duration: breakMinutes, description: `Break: ${hobby}` });
            if (breakBlock > 10) {
                plan.push({ type: "break", duration: breakMinutes, description: `Break: ${hobby}` });
            }
        } else {
            plan.push({ type: "break", duration: breakMinutes, description: "Break: Relax" });
        }

        return plan;
    }

    let studyPlan = generateStudyPlan(timeSlot, hobbiesData.hobbies);
    let currentStep = 0;
    let timerInterval;

    function startStep(step) {
        const stepData = studyPlan[step];
        currentTask.textContent = stepData.description;
        let timeLeft = stepData.duration * 60; // convert minutes to seconds
        timerDisplay.textContent = formatTime(timeLeft);

        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = formatTime(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                // Play timer sound
                timerSound.play();

                currentStep++;
                if (currentStep < studyPlan.length) {
                    startStep(currentStep);
                } else {
                    currentTask.textContent = "Session Complete! Great job!";
                    timerDisplay.textContent = "00:00";
                    startBtn.style.display = "block";
                    startBtn.textContent = "Restart Session";
                }
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    }

    startBtn.addEventListener("click", function () {
        startBtn.style.display = "none";
        startStep(currentStep);
    });

    // Show info about session
    sessionInfo.textContent = `Total Time: ${timeSlot} minutes | Personalized Breaks: ${hobbiesData.hobbies.join(", ")}`;
});
