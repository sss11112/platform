// Object to store transactions grouped by date
const transactionsByDate = {};

document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    // Check if date exists in transactionsByDate, if not create it
    if (!transactionsByDate[date]) {
        transactionsByDate[date] = [];
    }

    // Add transaction to the corresponding date
    const transaction = {
        type,
        description,
        amount,
        date: new Date(date).toLocaleDateString(),
    };
    transactionsByDate[date].push(transaction);

    // Update the UI
    renderTransactions();
    this.reset();
});

function renderTransactions() {
    const tableBody = document.getElementById("transaction-table-body");
    tableBody.innerHTML = ""; // Clear previous content

    // Loop through each date and its transactions
    for (const [date, transactions] of Object.entries(transactionsByDate)) {
        // Add a date row
        const dateRow = document.createElement("tr");
        dateRow.innerHTML = `
            <td colspan="5" style="font-weight: bold; background-color: #f1f1f1;">${new Date(date).toLocaleDateString()}</td>
        `;
        tableBody.appendChild(dateRow);

        // Add transactions for the date
        transactions.forEach((transaction, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
                <td>${transaction.description}</td>
                <td>$${transaction.amount.toFixed(2)}</td>
                <td>${transaction.date}</td>
                <td><button class="delete-btn" data-date="${date}" data-index="${index}">Delete</button></td>
            `;
            tableBody.appendChild(row);

            // Add delete functionality
            const deleteButton = row.querySelector(".delete-btn");
            deleteButton.addEventListener("click", function () {
                const date = this.getAttribute("data-date");
                const index = parseInt(this.getAttribute("data-index"));

                // Remove the transaction
                transactionsByDate[date].splice(index, 1);
                if (transactionsByDate[date].length === 0) {
                    delete transactionsByDate[date]; // Remove date if no transactions left
                }

                // Update totals and UI
                updateTotals(transaction.type, -transaction.amount);
                renderTransactions();
            });
        });
    }

    // Update totals
    calculateTotals();
}

function updateTotals(type, amount) {
    const totalIncome = document.getElementById("total-income");
    const totalExpenses = document.getElementById("total-expenses");
    const netProfit = document.getElementById("net-profit");

    let income = parseFloat(totalIncome.textContent.replace("$", ""));
    let expenses = parseFloat(totalExpenses.textContent.replace("$", ""));
    let profit = parseFloat(netProfit.textContent.replace("$", ""));

    if (type === "income") {
        income += amount;
    } else if (type === "expense") {
        expenses += amount;
    }

    profit = income - expenses;

    // Update UI
    totalIncome.textContent = `$${income.toFixed(2)}`;
    totalExpenses.textContent = `$${expenses.toFixed(2)}`;
    netProfit.textContent = `$${profit.toFixed(2)}`;
}

function calculateTotals() {
    let totalIncome = 0;
    let totalExpenses = 0;

    for (const transactions of Object.values(transactionsByDate)) {
        transactions.forEach((transaction) => {
            if (transaction.type === "income") {
                totalIncome += transaction.amount;
            } else if (transaction.type === "expense") {
                totalExpenses += transaction.amount;
            }
        });
    }

    const netProfit = totalIncome - totalExpenses;

    // Update UI
    document.getElementById("total-income").textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById("total-expenses").textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById("net-profit").textContent = `$${netProfit.toFixed(2)}`;
}