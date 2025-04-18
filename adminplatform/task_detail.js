document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("backend/upload_task_file.php", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            const resultDiv = document.getElementById("uploadResult");
            if (data.success) {
                resultDiv.style.color = "green";
                resultDiv.textContent = "File uploaded successfully!";
            } else {
                resultDiv.style.color = "red";
                resultDiv.textContent = data.message;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            document.getElementById("uploadResult").textContent = "An error occurred while uploading.";
        });
});