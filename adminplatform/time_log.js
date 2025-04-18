// Object to store time logs grouped by date
const timeLogs = {};

document.getElementById("time-log-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const employeeName = document.getElementById("employee-name").value.trim();
    const action = document.getElementById("action").value;
    const selectedDate = document.getElementById("date").value; // User-defined date
    const timestamp = new Date();
    const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Check if selectedDate exists in timeLogs, if not create it
    if (!timeLogs[selectedDate]) {
        timeLogs[selectedDate] = [];
    }

    // Add the new log entry to the corresponding date
    timeLogs[selectedDate].push({
        employeeName,
        action,
        time: formattedTime,
    });

    // Update the UI
    renderDayLinks(); // Update the list of day links
    renderTimeLogs(selectedDate); // Show logs for the selected day
    this.reset();
});

function renderDayLinks() {
    const dayLinksContainer = document.getElementById("day-links");
    dayLinksContainer.innerHTML = ""; // Clear previous links

    // Loop through each date and create a button/link
    Object.keys(timeLogs).forEach((date) => {
        const button = document.createElement("button");
        button.className = "day-link";
        button.innerText = new Date(date).toLocaleDateString();
        button.addEventListener("click", () => renderTimeLogs(date));
        dayLinksContainer.appendChild(button);
    });
}

function renderTimeLogs(selectedDate) {
    const container = document.getElementById("time-log-container");
    container.innerHTML = ""; // Clear previous records

    if (!timeLogs[selectedDate]) {
        container.innerHTML = `<p>No records found for ${new Date(selectedDate).toLocaleDateString()}</p>`;
        return;
    }

    // Create a daily record section
    const dailyRecord = document.createElement("div");
    dailyRecord.className = "daily-record";
    dailyRecord.innerHTML = `
        <h3>${new Date(selectedDate).toLocaleDateString()}</h3>
        <table>
            <thead>
                <tr>
                    <th>Employee Name</th>
                    <th>Action</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                ${timeLogs[selectedDate]
                    .map(
                        (log) => `
                    <tr>
                        <td>${log.employeeName}</td>
                        <td>${log.action.charAt(0).toUpperCase() + log.action.slice(1)}</td>
                        <td>${log.time}</td>
                    </tr>
                `
                    )
                    .join("")}
            </tbody>
        </table>
    `;
    container.appendChild(dailyRecord);
}