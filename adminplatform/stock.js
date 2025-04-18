const stockData = {};

document.getElementById("stock-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const productName = document.getElementById("product-name").value.trim();
    const quantity = parseInt(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);

    // Add or update stock
    if (!stockData[productName]) {
        stockData[productName] = { quantity, price };
    } else {
        stockData[productName].quantity += quantity;
        stockData[productName].price = price; // Update price if necessary
    }

    updateStockTable();
    this.reset();
});

document.getElementById("sell-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const productName = document.getElementById("sell-product-name").value.trim();
    const sellQuantity = parseInt(document.getElementById("sell-quantity").value);

    if (!stockData[productName]) {
        alert("Product not found in stock!");
        return;
    }

    if (stockData[productName].quantity < sellQuantity) {
        alert("Insufficient stock available!");
        return;
    }

    // Reduce stock
    stockData[productName].quantity -= sellQuantity;

    if (stockData[productName].quantity === 0) {
        delete stockData[productName]; // Remove item if quantity becomes 0
    }

    updateStockTable();
    this.reset();
});

function updateStockTable() {
    const tableBody = document.getElementById("stock-table-body");
    tableBody.innerHTML = "";

    for (const productName in stockData) {
        const { quantity, price } = stockData[productName];
        const totalValue = (quantity * price).toFixed(2);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${productName}</td>
            <td>${quantity}</td>
            <td>$${price.toFixed(2)}</td>
            <td>$${totalValue}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        tableBody.appendChild(row);

        const deleteButton = row.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function () {
            delete stockData[productName];
            updateStockTable();
        });
    }
}