// Display total study time from localStorage
const totalTime = localStorage.getItem("completedTime") || 0;
document.getElementById("totalTime").textContent = `You studied for ${totalTime} minutes`;

// Handle feedback submission
document.getElementById("submitFeedback").addEventListener("click", () => {
    const rating = document.querySelector('input[name="rating"]:checked')?.value || 0;
    const comments = document.getElementById("comments").value.trim();

    // For now, log feedback in console (later you can send to a server)
    console.log("Rating:", rating);
    if (!rating) {
    alert("Please select a rating (1-5 stars) before submitting!");
    return;
}


    console.log("Comments:", comments);
    if (!comments) {
    alert("Please write a comment before submitting!");
    return;
}

    console.log("Total time:", totalTime);

    alert("Thank you for your feedback!");

    // Clear localStorage if needed
    localStorage.removeItem("completedTime");

    // Redirect back to main page (change to your main page)
    window.location.href = "welcome.html";
});

