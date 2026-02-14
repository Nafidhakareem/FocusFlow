document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("startSessionBtn");
  const timerDisplay = document.getElementById("timerDisplay");
  const currentTask = document.getElementById("currentTask");
  const sessionInfo = document.getElementById("sessionInfo");
  const timerSound = document.getElementById("timerSound");

  // Retrieve stored data
  const timeSlot = parseInt(localStorage.getItem("timeSlot")) || 25;
  const hobbiesData = JSON.parse(
    localStorage.getItem("personalizationData"),
  ) || {
    hobbies: ["Walking", "Stretching"],
  };

  // Study plans
  const studyPlans = {
    30: [
      {
        type: "study",
        duration: 1,
        description: "Study: Focus on your main topic 📖",
      },
      {
        type: "break",
        duration: 1,
        description: `Break: ${hobbiesData.hobbies[0] || "Stretch"}`,
      },
      { type: "study", duration: 1, description: "Study: Quick review 🧾" },
    ],
    45: [
      {
        type: "study",
        duration: 25,
        description: "Study: Focused study block 📖",
      },
      {
        type: "break",
        duration: 5,
        description: `Break: ${hobbiesData.hobbies[0] || "Walk"}`,
      },
      { type: "study", duration: 10, description: "Study: Quick notes 🧾" },
    ],
    60: [
      {
        type: "study",
        duration: 30,
        description: "Study: Intensive session 📖",
      },
      {
        type: "break",
        duration: 10,
        description: `Break: ${hobbiesData.hobbies[0] || "Water & Stretch"}`,
      },
      {
        type: "study",
        duration: 20,
        description: "Study: Practice questions 🧾",
      },
    ],
    120: [
      { type: "study", duration: 30, description: "Study: Deep focus 📖" },
      {
        type: "break",
        duration: 10,
        description: `Break: ${hobbiesData.hobbies[0] || "Exercise"}`,
      },
      {
        type: "study",
        duration: 35,
        description: "Study: Review & practice 🧾",
      },
      {
        type: "break",
        duration: 10,
        description: `Break: ${hobbiesData.hobbies[0] || "Exercise"}`,
      },
      {
        type: "study",
        duration: 35,
        description: "Study: Review & practice 🧾",
      },
        {
        type: "Break",
        duration: 10,
        description: `Break: ${hobbiesData.hobbies[0] || "Exercise"}`,
      },
       {
        
      },
      
    ],
  };

  let studyPlan = studyPlans[timeSlot] || studyPlans[30];
  let currentStep = 0;
  let timerInterval;

  // Format time mm:ss
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  // Start each step
  function startStep(step) {
    const stepData = studyPlan[step];
    stepData.alertPlayed = false; // ✅ initialize at the start

    currentTask.textContent = stepData.description;

    let timeLeft = stepData.duration * 60;
    timerDisplay.textContent = formatTime(timeLeft);

    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = formatTime(timeLeft);
      console.log(`Time left for step ${step}: ${timeLeft} seconds`); // Debug log
      // 🔔 Play countdown alert at last 10 seconds (only once)
      if (timeLeft <= 10 && !stepData.alertPlayed && timeLeft > 0) {
        console.log(timeLeft, stepData.alertPlayed); // Debug log
        const soundClone = timerSound.cloneNode(true);
        soundClone.play().catch((err) => console.log("Audio error:", err));
        stepData.alertPlayed = true;
      }

      if (timeLeft <= 0) {
        clearInterval(timerInterval);

        currentStep++;

        if (currentStep < studyPlan.length) {
          startStep(currentStep);
        } else {
          // Final session complete
          const soundClone = timerSound.cloneNode(true);
          console.log("Playing session complete sound"); // Debug log
          soundClone.play().catch((err) => console.log("Audio error:", err));

          currentTask.textContent = "Session Complete! 🎉 Great job!";
          timerDisplay.textContent = "00:00";
          
          
          

          const totalTime = studyPlan.reduce((sum, s) => sum + s.duration, 0);
          localStorage.setItem("completedTime", totalTime);

          currentStep = 0;
        }
        window.location.href="feedback.html";
      }
    }, 1000);
  }

  // Start button click
  startBtn.addEventListener("click", function () {
    startBtn.style.display = "none";

    // Unlock browser{
     
   // timerSound.currentTime = 0;
    //timerSound.play().catch((err) => {
    //   console.log("Audio unlock failed:", err);
    // });

    startStep(currentStep);
  });
  

  // Display session info
  sessionInfo.textContent = `Total Time: ${timeSlot} minutes | Breaks: ${hobbiesData.hobbies.join(", ")}`;
});
