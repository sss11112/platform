document.addEventListener("DOMContentLoaded", function () {
    const totalIncome = 50000;
    const totalExpenses = 20000;
    const netProfit = totalIncome - totalExpenses;
    const employeeCheckin = 25;
    const stockCount = 150;
    const currentDate = new Date().toLocaleDateString();

    document.getElementById("total-income").textContent = `$${totalIncome.toLocaleString()}`;
    document.getElementById("total-expenses").textContent = `$${totalExpenses.toLocaleString()}`;
    document.getElementById("net-profit").textContent = `$${netProfit.toLocaleString()}`;
    document.getElementById("employee-checkin").textContent = employeeCheckin;
    document.getElementById("stock-count").textContent = stockCount;

    document.getElementById("checkin-date").textContent = `Date: ${currentDate}`;

    const apiKey = "YOUR_API_KEY";
    const city = "Phatthalung";
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.current.temp_c;
            const cityName = data.location.name;
            document.getElementById("temperature").textContent = `${temperature}°C`;
            document.getElementById("temperature-city").textContent = `Location: ${cityName}`;
        })
        .catch(error => {
            console.error("Error fetching temperature data:", error);
            document.getElementById("temperature").textContent = "N/A";
            document.getElementById("temperature-city").textContent = "Location: Unknown";
        });
});
