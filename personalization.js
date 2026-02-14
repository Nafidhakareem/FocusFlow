document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("personalizationForm");
    const addHobbyBtn = document.getElementById("addHobbyBtn");
    const customHobbyInput = document.getElementById("customHobby");
    const checkboxGroup = document.getElementById("checkboxGroup");

    // Add custom hobby
    addHobbyBtn.addEventListener("click", function () {
        const hobby = customHobbyInput.value.trim();
        if (hobby === "") return;

        // Create new checkbox element
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" name="hobbies" value="${hobby.toLowerCase()}"> ${hobby}`;
        checkboxGroup.appendChild(label);

        // Clear input
        customHobbyInput.value = "";
    });

    // Submit form
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Collect hobbies
        const hobbies = Array.from(document.querySelectorAll('input[name="hobbies"]:checked')).map(el => el.value);

        if(hobbies.length === 0){
            alert("Please select at least one hobby for personalized breaks.");
            return;
        }

        // Save to localStorage for later use
        localStorage.setItem("personalizationData", JSON.stringify({ hobbies }));

        // Go to next page (Study Goal selection)
        window.location.href = "studygoal.html";
    });
});
