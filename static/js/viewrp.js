// Selectors
const buttonAngleLeft = document.querySelector(".inner-view-main .inner-containner .inner-left .inner-tag .inner-dash button");
const innerLeft = document.querySelector(".inner-view-main .inner-containner .inner-left");
const innerMain = document.querySelector(".inner-view-main .inner-containner .inner-body .inner-right");
const innerShort = document.querySelector(".inner-view-main .inner-containner .inner-body button");
// const xbutton = document.querySelector(".inner-view-main .inner-view-main__window .inner-view-main__window--header button");
// const detail = document.querySelector(".inner-view-main .inner-view-main__window");
// const plusopen = document.querySelectorAll(".inner-view-main .inner-containner .inner-body .inner-right .inner-table table tbody tr button ");

// Handle collapsing and expanding the left panel
buttonAngleLeft.addEventListener("click", () => {
    innerLeft.style.display = "none";
    innerMain.style.width = "100%";
    innerMain.style.justifyContent = "center";
});

innerShort.addEventListener("click", () => {
    innerLeft.style.display = "block";
    innerMain.style.width = "80%";
    innerMain.style.justifyContent = "space-between";
});

// Close detail modal
document.addEventListener("DOMContentLoaded", () => {
    // Selectors for modal and close button
    const detail = document.querySelector(".inner-view-main .inner-view-main__window");
    const xbutton = document.querySelector(".inner-view-main .inner-view-main__window--header button");

    // Ensure the close button hides the modal
    xbutton.addEventListener("click", () => {
        detail.style.display = "none";
    });
});
document.querySelector(".inner-table tbody").addEventListener("click", (event) => {
    if (event.target.closest("button.moredetail")) {
        const detail = document.querySelector(".inner-view-main .inner-view-main__window");
        detail.style.display = "block";
    }
});

// Open detail modal on button click
document.addEventListener("DOMContentLoaded", () => {
    const plusopen = document.querySelectorAll(".inner-view-main .inner-containner .inner-body .inner-right .inner-table table tbody tr td button");

    plusopen.forEach(button => {
        button.addEventListener("click", () => {
            const detail = document.querySelector(".inner-view-main .inner-view-main__window");
            detail.style.display = "block";
        });
    });
});
const detailheader= document.querySelector('.inner-view-main .inner-view-main__window .inner-view-main__window--header .inner-name')
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector(".inner-view-main .inner-table tbody");
    const detailModal = document.querySelector(".inner-view-main .inner-view-main__window");
    const modalContent = document.querySelector(".inner-view-main__window--header--content");

    // Fetch print data and user data from API concurrently
    Promise.all([fetch("/get_print_data"), fetch("/get_users")])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(([printData, userData]) => {
            console.log("Print Data:", printData);
            console.log("User Data:", userData);

            tableBody.innerHTML = ""; // Clear previous data

            // Loop through the printData object and match with userData based on StudentID
            printData.forEach(printJob => {
                const user = Object.values(userData).find(user => user.StudentID === printJob.StudentID);

                // If no matching user is found, skip this print job
                if (!user) {
                    console.log(`No user found for print job with StudentID: ${printJob.StudentID}`);
                    return;
                }

                // Find printer details from printJob
                const printer = printJob.printerId || "N/A"; // You can replace this with actual printer data if needed
                detailheader.innerHTML = `${user.name || "N/A"}`;
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.name || "N/A"}</td>
                    <td>${printer || "N/A"}</td>
                    <td>${user.phone || "N/A"}</td>
                    <td>${user.email || "N/A"}</td>
                    <td>${printJob.pageCount || "N/A"}</td>
                    <td>${printJob.timestamp || "N/A"}</td>
                    <td>
                        <button class="moredetail" data-username="${printJob.id}">
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                    </td>
                `;
                console.log("Print Job ID in row:", printJob.id);
                tableBody.appendChild(row);
            });

            // Add event listener for "More Detail" button
            tableBody.addEventListener("click", (event) => {
                console.log("Click event detected", event.target);
                const button = event.target.closest("button.moredetail");
                if (button) {
                    console.log("More Detail button clicked");
                    const printJobID = button.getAttribute("data-username"); // Đọc giá trị trực tiếp
                    console.log("Print Job ID:", printJobID);
                    // const printJobID = event.target.closest("button").dataset.printjobid;
                    
                    const printJob = printData.find(p => p.id === Number(printJobID));// Use Number() to ensure proper comparison
                    console.log("Print Job ID:", printJobID);
                    if (!printJob) {
                        console.error("No print job found for PrintJobID:", printJobID);
                        return;
                    }
            
                    const user = Object.values(userData).find(user => user.StudentID === printJob.StudentID);
            
                    if (!user) {
                        console.error("No user found for StudentID:", printJob.StudentID);
                        return;
                    }
            
                    modalContent.innerHTML = `
                        <div>Tên học sinh: ${user.name || "N/A"}</div>
                        <div>Mã số sinh viên: ${user.StudentID || "N/A"}</div>
                        <div>Mã máy in: ${printJob.printerId || "N/A"}</div>
                        <div>Điện thoại: ${user.phone || "N/A"}</div>
                        <div>Email: ${user.email || "N/A"}</div>
                        <div>Số trang in: ${printJob.pageCount || "N/A"} (${printJob.paperSize || "N/A"})</div>
                        <div>Tên file: ${printJob.uploadedFiles.length > 0 ? printJob.uploadedFiles[0].name : "N/A"}</div>
                        <div>Số lượng bản copy: ${printJob.copyCount || "N/A"}</div>
                        <div>Thời gian bắt đầu in: ${printJob.timestamp || "N/A"}</div>
                        <hr />
                    `;
            
                    detailModal.style.display = "block";
                }
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});


