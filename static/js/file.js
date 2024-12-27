window.addEventListener("load", () => {
    const input = document.getElementById("file-upload");
    const filewarpper = document.getElementById("filewarpper");
    const firstDiv = document.querySelector(".upload .inner-warp .inner-box .inner-main .inner-file .first-stage .main-upload .first");
    const mainCont = document.querySelector(".upload .inner-warp .inner-box .inner-main .inner-file .first-stage .inner-main-content");
    const subCont = document.querySelector(".upload .inner-warp .inner-box .inner-main .inner-file .first-stage .inner-sub-content");
    const addMore = document.querySelector(".upload .inner-warp .inner-box .inner-main .inner-file .first-stage .add-forward");
    const fileW = document.querySelector(".upload .inner-warp .inner-box .inner-main .inner-file .first-stage .main-upload .filewarpper");
    const forWard = document.querySelector(".upload .inner-warp .inner-box .inner-main .inner-file .first-stage .add-forward .forward");
    const FirstStage = document.querySelector(".upload .inner-warp .inner-box .inner-main .inner-file .first-stage");
    const SecondStage = document.querySelector(".upload .inner-warp .inner-box .inner-main .inner-file .second-stage .second-stage-one");
    const backButton = document.querySelector(".upload .inner-warp .inner-box .inner-main .inner-file .second-stage .second-stage-one .inner-button-back button");
    const FirstStageCard = document.querySelector(".upload .inner-warp .inner-box .inner-main .inner-process .inner-upload");
    const SecondStageCard = document.querySelector(".upload .inner-warp .inner-box .inner-main .inner-process .choose-printer");
    const SecondStagetwo = document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .second-stage .second-stage-two');
    const ThirdStageCard = document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-process .print-prop')
    const ThirdStage = document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .third-stage')
    const FourthStage = document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .fourth-stage')
    const FourthStageCard = document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-process .confirm')
    // Store uploaded files in this array
    let uploadedFiles = [];

    const fileshow = (fileName, filetype) => {
        const showfileboxElem = document.createElement("div");
        showfileboxElem.classList.add("showfilebox");

        const leftElem = document.createElement("div");
        leftElem.classList.add("left");

        const fileTypeElem = document.createElement("span");
        fileTypeElem.classList.add("filetype");
        fileTypeElem.innerHTML = filetype;
        leftElem.append(fileTypeElem);

        const filetitleElem = document.createElement("h3");
        filetitleElem.innerHTML = fileName;
        leftElem.append(filetitleElem);

        const rightElem = document.createElement("div");
        rightElem.classList.add("right");

        const crossElem = document.createElement("span");
        crossElem.innerHTML = "&#215;"; // HTML code for the '×' character
        crossElem.style.cursor = "pointer"; // Add pointer cursor to indicate clickability
        rightElem.append(crossElem);

        showfileboxElem.append(leftElem);
        showfileboxElem.append(rightElem);
        filewarpper.append(showfileboxElem);

        // Remove the file from display and reset states on click
        crossElem.addEventListener("click", () => {
            showfileboxElem.remove();
            uploadedFiles = uploadedFiles.filter(file => file.name !== fileName); // Remove the file from the uploadedFiles array
            if (filewarpper.childElementCount === 0) {
                firstDiv.style.display = "flex";
                mainCont.style.display = "flex";
                subCont.style.display = "flex";
                fileW.style.height = "0";
                addMore.style.display = "none";
            }
        });
    };

    input.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            let fileName = e.target.files[0].name;
            let filetype = fileName.split(".").pop(); // Extract the file extension
            uploadedFiles.push({ name: fileName, type: filetype }); // Add the file to the uploadedFiles array
            fileshow(fileName, filetype);
            firstDiv.style.display = "none";
            mainCont.style.display = "none";
            subCont.style.display = "none";
            fileW.style.height = "100%";
            addMore.style.display = "flex";
        }
    });

    forWard.addEventListener("click", () => {
        FirstStage.style.display = "none";
        SecondStage.style.display = "block";
        FirstStageCard.style.color = '#000000'; // Set text color to black
        FirstStageCard.style.backgroundColor = 'transparent'; // Set background color to transparent
        SecondStageCard.style.color = '#FFFFFF';
        SecondStageCard.style.backgroundColor = '#1488DB';
    });

    backButton.addEventListener("click", () => {
        // When you go back, render the uploaded files
        filewarpper.innerHTML = ''; // Clear the existing file list before rendering
        uploadedFiles.forEach(file => {
            fileshow(file.name, file.type);
        });

        // Ensure the right UI states are displayed
        firstDiv.style.display = "none";
        mainCont.style.display = "none";
        subCont.style.display = "none";
        fileW.style.height = "100%";
        addMore.style.display = "flex";
        FirstStage.style.display = "block";
        SecondStage.style.display = "none"; // Hide the second stage
        SecondStageCard.style.color = '#000000'; // Set text color to black
        SecondStageCard.style.backgroundColor = 'transparent'; // Set background color to transparent
        FirstStageCard.style.color = '#FFFFFF';
        FirstStageCard.style.backgroundColor = '#1488DB';
    });
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');
    const modalHeaderName = modal.querySelector(".modal-header__name");
    const modalBodyContent = modal.querySelector(".modal-body__content-desc");
    let printers = []; // Tạo mảng rỗng ban đầu

// Lấy dữ liệu từ server
// Lấy danh sách printers từ server
fetch('/get_printers')
    .then(response => response.json())
    .then(data => {
        printers = data; // Gán dữ liệu từ server vào mảng printers
        console.log("Printers fetched from server:", printers);

        // Sau khi printers được tải xong, gán sự kiện cho các nút
        openModalButtons.forEach(button => {
            button.addEventListener("click", () => {
                const modal = document.querySelector(button.dataset.modalTarget);
                const printerId = button.getAttribute("data-id");
                const printer = printers.find(p => p.id === printerId);
                if (printer) {
                    // Cập nhật thông tin trong modal
                    modalHeaderName.innerText = printer.name;
                    modalBodyContent.innerHTML = `
                        <p>Mã máy in: ${printer.id}</p>
                        <p>Tên thương hiệu: ${printer.brand}</p>
                        <p>Kiểu máy: ${printer.model}</p>
                        <p>Hoạt động vào ngày: ${printer.date}</p>
                        <p>Số trang còn lại: ${printer.pages}</p>
                        <p>Mô tả: ${printer.description}</p>
                        <p>Địa điểm: ${printer.location}</p>
                    `;
                    // Cập nhật hình ảnh trong modal
                    const modalImage = modal.querySelector('img');
                    modalImage.src = `../static/image/${printer.id}.png`; // Cập nhật src hình ảnh

                    openModal(modal);
                }
            });
        });
    })
    .catch(error => console.error("Error fetching printers:", error));


    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            closeModal(modal)
        })
    })
    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest('.modal');
            closeModal(modal)
        })
    })
    function openModal(modal) {
        if (modal == null) return
        modal.classList.add('active');
        overlay.classList.add('active');
    }
    function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
    // 
    const openModalConfirm = document.querySelector('.inner-file .second-stage .second-stage-one .inner-printers .modal-body .modal-body__content-button');
    const closeModalConfirm = document.querySelector('.inner-file .second-stage .second-stage-one .inner-printers .modal .modal-confirm__header .modal-confirm__header-close');
    const refuseConfirm = document.querySelector('.inner-file .second-stage .second-stage-one .inner-printers .modal .modal-confirm__body .modal-confirm__body-buttons .no');
    const modalConfirm = document.querySelector('.inner-file .second-stage  .second-stage-one .inner-printers .modal .modal-confirm');
    const modalConfirmHeaderName = modalConfirm.querySelector(".modal-confirm__header-name"); // Lấy modal header name

    function updateModalConfirm(printerId) {
        // Tìm máy in dựa trên id
        const printer = printers.find(p => p.id === printerId);
        if (printer) {
            // Nếu tìm thấy máy in, cập nhật tên máy in vào modal
            document.querySelector(".modal-confirm__header-name").textContent = printer.name;
        } else {
            // Nếu không tìm thấy máy in, có thể thông báo lỗi hoặc làm gì đó
            console.log("Printer not found!");
        }
    }

    openModalConfirm.addEventListener("click", (event) => {
        // Lấy id của máy in từ data-id trong button
        const printerId = event.target.getAttribute("data-id");

        // Cập nhật modal với tên máy in
        updateModalConfirm(printerId);

        // Mở modal
        modalConfirm.style.transform = "translate(-50%, -50%) scale(1)";
    });

    //
    closeModalConfirm.addEventListener("click", () => {
        modalConfirm.style.transform = "translate(-50%, -50%) scale(0)";
    });
    refuseConfirm.addEventListener("click", () => {
        modalConfirm.style.transform = "translate(-50%, -50%) scale(0)";
    });
    const approveConfirm = document.querySelector('.inner-file .second-stage .second-stage-one .inner-printers .modal .modal-confirm__body .modal-confirm__body-buttons .yes');
    approveConfirm.addEventListener("click", () => {
        SecondStage.style.display = "none";
        modalConfirm.style.transform = "translate(-50%, -50%) scale(0)";
        overlay.classList.remove('active');
        SecondStagetwo.style.display = 'flex';

    })
    const changePrinter = document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .second-stage .second-stage-two .second-stage-two__content .second-stage-two__content-foot .change')
    changePrinter.addEventListener("click", () => {
        SecondStage.style.display = "block";
        SecondStagetwo.style.display = 'none';
        overlay.classList.add('active');
    })
    let selectedPrinterId = null; // Global variable to store the selected printer ID

    const confirmPrinter = document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .second-stage .second-stage-two .second-stage-two__content .second-stage-two__content-foot .confirm');

    confirmPrinter.addEventListener("click", () => {
        // Get the selected printer's ID
        const printerHeader = document.querySelector(".second-stage-two__header");
        if (printerHeader) {
            selectedPrinterId = printerHeader.textContent.trim();
             // Save the printer name or ID
             const printer = printers.find(p => p.name === selectedPrinterId);
             if (printer) {
                 selectedPrinterId = printer.id; // Save the printer ID
             } else {
                 console.warn("No matching printer found for name:", selectedPrinterId);
             }
        }

        // Update UI states
        SecondStage.style.display = "none";
        SecondStagetwo.style.display = "none";
        ThirdStage.style.display = "flex";
        SecondStageCard.style.color = "#000000"; // Set text color to black
        SecondStageCard.style.backgroundColor = "transparent"; // Set background color to transparent
        ThirdStageCard.style.color = "#FFFFFF";
        ThirdStageCard.style.backgroundColor = "#1488DB";

        console.log("Selected Printer ID:", selectedPrinterId); // Debugging: Log the selected printer ID
    });

    const thirdBack = document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .third-stage .third-stage__foot .third-back')
    thirdBack.addEventListener("click", () => {
        SecondStagetwo.style.display = 'flex';
        ThirdStage.style.display = 'none';
        ThirdStageCard.style.color = '#000000'; // Set text color to black
        ThirdStageCard.style.backgroundColor = 'transparent'; // Set background color to transparent
        SecondStageCard.style.color = '#FFFFFF';
        SecondStageCard.style.backgroundColor = '#1488DB';
    })

    const fourthStageFileBox = document.querySelector('.fourth-stage__uploaded-file-box');

    // Function to update the file list in the fourth-stage
    function displayUploadedFiles() {
        fourthStageFileBox.innerHTML = ''; // Clear existing files

        uploadedFiles.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.classList.add('uploaded-file-item');

            // Split the name or type by comma if it contains commas
            const fileNameParts = file.name.split(',');  // Split by comma for name
            // const fileTypeParts = file.type.split(',');  // Split by comma for type

            fileItem.innerHTML = `
            <p>${fileNameParts.join(', ')}</p>  <!-- Join parts with comma -->
        `;

            fourthStageFileBox.appendChild(fileItem);
        });
    }
    function updatePrinterInfo(printerId) {
        const printer = printers.find(p => p.id === printerId);
        if (printer) {
            document.querySelector(".second-stage-two__header").textContent = printer.name;
            document.getElementById("printer-id").textContent = `Mã máy in: ${printer.id}`;
            document.getElementById("printer-brand").textContent = `Tên thương hiệu: ${printer.brand}`;
            document.getElementById("printer-model").textContent = `Kiểu máy: ${printer.model}`;
            document.getElementById("printer-date").textContent = `Hoạt động vào ngày: ${printer.date}`;
            document.getElementById("printer-pages").textContent = `Số trang còn lại: ${printer.pages} (15:35 27/09/2024)`;  // Sử dụng thời gian giả định
            document.getElementById("printer-description").textContent = `Mô tả: ${printer.description}`;
            document.getElementById("printer-location").textContent = `Địa điểm: ${printer.location}`;

            // Cập nhật hình ảnh máy in
            document.getElementById("printer-image").src = `../static/image/${printer.id}.png`;
        }
    }

    // Lắng nghe sự kiện click cho các nút
    const printerButtons = document.querySelectorAll('.inner-row button');
    printerButtons.forEach(button => {
        button.addEventListener("click", () => {
            const printerId = button.getAttribute("data-id");  // Lấy data-id từ nút
            updatePrinterInfo(printerId);  // Cập nhật thông tin máy in
        });
    });
    let savedPageCount = null;
    // Update the thirdNext event listener to include file display
    const thirdNext = document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .third-stage .third-stage__foot .third-next');
    thirdNext.addEventListener("click", () => {
        const paperSize = document.getElementById("size").value;
        const printMode = document.getElementById("mode").value;
        const pageCount = document.querySelector('.third-stage__setting-prop-num input').value;
        const copyCount = document.querySelector('.third-stage__setting-prop-copy input').value;
    
        // Gọi API để lấy StudentID
        fetch("/get_student_id")
            .then(response => response.json())
            .then(studentData => {
                console.log("StudentID API response:", studentData); // Log dữ liệu từ API /get_student_id
                if (studentData.success) {
                    const studentID = studentData.StudentID;
    
                    // Gọi API để lấy danh sách người dùng
                    fetch("/get_users")
                        .then(response => response.json())
                        .then(userData => {
                            console.log("Users API response:", userData); // Log dữ liệu từ API /get_users
                            const user = Object.values(userData).find(u => u.StudentID === studentID);
                            console.log("Matched user:", user); // Log thông tin user khớp với StudentID
                            if (user) {
                                const userPage = user.page;
                                console.log("User page allowance:", userPage); // Log số trang của user
    
                                // Gọi API check_pages với thông tin người dùng
                                fetch("/check_pages", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        paperSize: paperSize,
                                        printMode: printMode,
                                        pageCount: pageCount,
                                        copyCount: copyCount,
                                        username: "user" // Thay bằng giá trị phù hợp nếu cần
                                    })
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log("Check pages API response:", data); // Log dữ liệu từ API /check_pages
                                        if (data.success) {
                                            savedPageCount = pageCount;
                                            const printSettings = {
                                                paperSize: paperSize,
                                                printMode: printMode,
                                                pageCount: pageCount,
                                                copyCount: copyCount
                                            };
    
                                            updateFourthStage(printSettings, selectedPrinterId);
                                            displayUploadedFiles();
    
                                            ThirdStage.style.display = "none";
                                            FourthStage.style.display = "flex";
                                            ThirdStageCard.style.color = "#000000";
                                            ThirdStageCard.style.backgroundColor = "transparent";
                                            FourthStageCard.style.color = "#FFFFFF";
                                            FourthStageCard.style.backgroundColor = "#1488DB";
                                        } else {
                                            alert("Invalid operation: " + data.message);
                                        }
                                    })
                                    .catch(error => {
                                        console.error("Error calling check_pages API:", error);
                                    });
                            } else {
                                alert("User not found.");
                            }
                        })
                        .catch(error => {
                            console.error("Error fetching users:", error);
                        });
                } else {
                    alert("Failed to fetch StudentID: " + studentData.message);
                }
            })
            .catch(error => {
                console.error("Error fetching StudentID:", error);
            });
    });
    

    // Function to update print settings display in fourth-stage
    function updateFourthStage(settings, printer) {
        const fourthStageDetails = document.querySelector('.fourth-stage__uploaded-file-prop');
        fourthStageDetails.innerHTML = `
            <p>Máy in: ${printer}</p>
            <p>Cỡ giấy: ${settings.paperSize}</p>
            <p>Số trang in: ${settings.pageCount}</p>
            <p>Chế độ in: ${settings.printMode === 'twoside' ? 'Hai mặt' : 'Một mặt'}</p>
            <p>Số lượng bản sao: ${settings.copyCount}</p>
        `;
    }
    

    const fourthBack = document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .fourth-stage .fourth-stage__foot .fourth-back')
    fourthBack.addEventListener("click", () => {
        ThirdStage.style.display = 'flex';
        FourthStage.style.display = 'none';
        FourthStageCard.style.color = '#000000'; // Set text color to black
        FourthStageCard.style.backgroundColor = 'transparent'; // Set background color to transparent
        ThirdStageCard.style.color = '#FFFFFF';
        ThirdStageCard.style.backgroundColor = '#1488DB';
    })
    const fourthNext = document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .fourth-stage .fourth-stage__foot .fourth-next');

fourthNext.addEventListener("click", () => {
    const printerId = selectedPrinterId; // Use the stored printer ID
    const paperSize = document.getElementById("size").value;
    const pageCount = savedPageCount; // Use the saved page count
    const copyCount = document.querySelector('.third-stage__setting-prop-copy input').value;
    const printMode = document.getElementById("mode").value;

    // Gọi API để lấy StudentID
    fetch("/get_student_id")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const StudentID = data.StudentID; // Lấy StudentID từ server
                const timestamp = new Date().toISOString();
                // Validate input
                console.log(data);
                if (!printerId || !pageCount || !StudentID) {
                    alert("Missing required information. Please check your input.");
                    return;
                }

                // Create data to send
                const printData = {
                    printerId: printerId,
                    paperSize: paperSize,
                    pageCount: pageCount,
                    copyCount: copyCount,
                    printMode: printMode,
                    StudentID: StudentID,
                    timestamp: timestamp, // Gửi StudentID đến server
                    uploadedFiles: uploadedFiles // Add the uploaded files here
                };

                // Gửi dữ liệu đến server
                fetch("/save_print_data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(printData) // Send the print data as JSON
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert("Print info saved successfully!");
                            console.log(data);
                            window.location.href = '/upload';
                        } else {
                            alert("Failed to save print info: " + data.message);
                        }
                    })
                    .catch(error => console.error("Error:", error));
            } else {
                alert("Failed to fetch StudentID: " + data.message);
            }
        })
        .catch(error => console.error("Error fetching StudentID:", error));
});

    

});
