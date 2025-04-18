// Example employee data
const employees = [
    { name: "John Doe", position: "Software Engineer", photo: "https://via.placeholder.com/80" },
    { name: "Jane Smith", position: "Project Manager", photo: "https://via.placeholder.com/80" },
    { name: "Alice Johnson", position: "UI/UX Designer", photo: "https://via.placeholder.com/80" },
    { name: "Bob Brown", position: "DevOps Engineer", photo: "https://via.placeholder.com/80" },
    { name: "Charlie White", position: "Data Scientist", photo: "https://via.placeholder.com/80" },
];

// Render employee cards
function renderEmployees() {
    const container = document.getElementById("employee-container");
    container.innerHTML = ""; // Clear any existing content

    employees.forEach((employee) => {
        const card = document.createElement("div");
        card.className = "employee-card";
        card.innerHTML = `
            <img src="${employee.photo}" alt="${employee.name}">
            <h3>${employee.name}</h3>
            <p>${employee.position}</p>
        `;
        container.appendChild(card);
    });
}

// Initialize the employee directory
renderEmployees();