// Object to store absence records grouped by date
const absences = {};

document.getElementById("absence-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const employeeName = document.getElementById("employee-name").value.trim();
    const date = document.getElementById("date").value;
    const reason = document.getElementById("reason").value.trim();
    const medicalCertificate = document.getElementById("medical-certificate").files[0];

    // Create record object
    const record = {
        employeeName,
        reason,
        medicalCertificateUrl: medicalCertificate
            ? URL.createObjectURL(medicalCertificate) // Generate temporary URL for the file
            : null,
    };

    // Check if date exists in absences, if not create it
    if (!absences[date]) {
        absences[date] = [];
    }

    // Add record to the corresponding date
    absences[date].push(record);

    // Update the UI
    renderDayLinks(); // Update the list of day links
    renderAbsences(date); // Show absences for the selected day
    this.reset();
});

function renderDayLinks() {
    const dayLinksContainer = document.getElementById("day-links");
    dayLinksContainer.innerHTML = ""; // Clear previous links

    // Loop through each date and create a button/link
    Object.keys(absences).forEach((date) => {
        const button = document.createElement("button");
        button.className = "day-link";
        button.innerText = new Date(date).toLocaleDateString();
        button.addEventListener("click", () => renderAbsences(date));
        dayLinksContainer.appendChild(button);
    });
}

function renderAbsences(selectedDate) {
    const container = document.getElementById("absence-container");
    container.innerHTML = ""; // Clear previous records

    if (!absences[selectedDate]) {
        container.innerHTML = `<p>No absences found for ${new Date(selectedDate).toLocaleDateString()}</p>`;
        return;
    }

    absences[selectedDate].forEach((record, index) => {
        const card = document.createElement("div");
        card.className = "absence-card";
        card.innerHTML = `
            <h3>${record.employeeName}</h3>
            <p><strong>Reason:</strong> ${record.reason}</p>
            ${
                record.medicalCertificateUrl
                    ? `<p><strong>Medical Certificate:</strong> <a href="${record.medicalCertificateUrl}" target="_blank">View Certificate</a></p>`
                    : ""
            }
            <button onclick="deleteAbsence('${selectedDate}', ${index})">Delete</button>
        `;
        container.appendChild(card);
    });
}

function deleteAbsence(date, index) {
    absences[date].splice(index, 1); // Remove record from the selected date
    if (absences[date].length === 0) {
        delete absences[date]; // Delete the date key if no records are left
    }
    renderDayLinks(); // Update day links
    renderAbsences(date); // Refresh absence records
}