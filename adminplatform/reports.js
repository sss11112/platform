document.addEventListener("DOMContentLoaded", function () {
    renderMonthLinks();
});

function renderMonthLinks() {
    const monthLinksContainer = document.getElementById("month-links");
    const storedData = JSON.parse(localStorage.getItem("accountingData")) || {};

    monthLinksContainer.innerHTML = ""; // Clear previous links

    // Loop through months and create links
    Object.keys(storedData).forEach((month) => {
        const button = document.createElement("button");
        button.className = "month-link";
        button.innerText = `${new Date(month + "-01").toLocaleString("default", { month: "long", year: "numeric" })}`;
        button.addEventListener("click", () => renderReports(month));
        monthLinksContainer.appendChild(button);
    });
}

function renderReports(selectedMonth) {
    const container = document.getElementById("report-container");
    const storedData = JSON.parse(localStorage.getItem("accountingData")) || {};
    const reports = storedData[selectedMonth] || [];

    container.innerHTML = ""; // Clear previous records

    if (reports.length === 0) {
        container.innerHTML = `<p>No reports found for ${selectedMonth}</p>`;
        return;
    }

    reports.forEach((record, index) => {
        const card = document.createElement("div");
        card.className = "report-card";
        card.innerHTML = `
            <h3>Report for ${new Date(selectedMonth + "-01").toLocaleString("default", { month: "long", year: "numeric" })}</h3>
            <p><strong>Income:</strong> $${record.income.toFixed(2)}</p>
            <p><strong>Expense:</strong> $${record.expense.toFixed(2)}</p>
            <p><strong>Balance:</strong> $${record.balance.toFixed(2)}</p>
            <p><strong>Details:</strong> ${record.details || "No additional details provided."}</p>
            <button onclick="deleteReport('${selectedMonth}', ${index})">Delete</button>
        `;
        container.appendChild(card);
    });
}

function deleteReport(month, index) {
    const storedData = JSON.parse(localStorage.getItem("accountingData")) || {};

    // Remove report by index
    storedData[month].splice(index, 1);
    if (storedData[month].length === 0) {
        delete storedData[month]; // Remove month if no reports left
    }

    // Save updated data back to localStorage
    localStorage.setItem("accountingData", JSON.stringify(storedData));

    // Refresh UI
    renderMonthLinks();
    renderReports(month);
}