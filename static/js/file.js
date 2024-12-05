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
    const SecondStagetwo=document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .second-stage .second-stage-two');
    const ThirdStageCard=document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-process .print-prop')
    const ThirdStage=document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .third-stage')
    const FourthStage=document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .fourth-stage')
    const FourthStageCard=document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-process .confirm')
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
    const printers = [
        {
            id: "B1-1",
            name: "Máy in B1-1",
            brand: "Epson",
            model: "Epson EcoTank ET-3760",
            date: "21/10/2024",
            pages: "238",
            description: "Tốc độ in 24 trang/phút. Máy in đa chức năng. Sức chứa giấy 500 tờ.",
            location: "Cơ sở 1, tòa B1, phòng B1-101"
        },
        {
            id: "B1-2",
            name: "Máy in B1-2",
            brand: "Canon",
            model: "Canon PIXMA G6020",
            date: "22/10/2024",
            pages: "182",
            description: "Máy in không dây, tốc độ in 13 trang/phút. Hỗ trợ in màu và in hai mặt tự động. Dung lượng giấy 350 tờ.",
            location: "Cơ sở 1, tòa B1, phòng B1-102"
        },
        {
            id: "B4-1",
            name: "Máy in B4-1",
            brand: "Brother",
            model: "Brother MFC-L2750DW",
            date: "23/10/2024",
            pages: "450",
            description: "Máy in laser đa chức năng. Tốc độ in 36 trang/phút. Hỗ trợ in di động và in hai mặt tự động. Khay giấy 250 tờ.",
            location: "Cơ sở 4, tòa B4, phòng B4-101"
        },
        {
            id: "B6-1",
            name: "Máy in B6-1",
            brand: "HP",
            model: "HP LaserJet Pro MFP M428fdw",
            date: "24/10/2024",
            pages: "305",
            description: "Máy in laser đa năng, tốc độ in 40 trang/phút. Hỗ trợ in không dây và in hai mặt. Sức chứa giấy 350 tờ.",
            location: "Cơ sở 6, tòa B6, phòng B6-101"
        }


    ];
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
                modalImage.src = `../static/image/${printer.id}.png`;  // Cập nhật src hình ảnh
    
                openModal(modal);
            }
        });
    });
    
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
    const approveConfirm=document.querySelector('.inner-file .second-stage .second-stage-one .inner-printers .modal .modal-confirm__body .modal-confirm__body-buttons .yes');
    approveConfirm.addEventListener("click",()=>{
        SecondStage.style.display="none";
        modalConfirm.style.transform = "translate(-50%, -50%) scale(0)";
        overlay.classList.remove('active');
        SecondStagetwo.style.display='flex';
        
    })
    const changePrinter=document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .second-stage .second-stage-two .second-stage-two__content .second-stage-two__content-foot .change')
    changePrinter.addEventListener("click",()=>{
        SecondStage.style.display="block";
        SecondStagetwo.style.display='none';
        overlay.classList.add('active');
    })
    const confirmPrinter=document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .second-stage .second-stage-two .second-stage-two__content .second-stage-two__content-foot .confirm')
    
    confirmPrinter.addEventListener("click",()=>{
        SecondStage.style.display="none";
        SecondStagetwo.style.display='none';
        ThirdStage.style.display='flex';
        SecondStageCard.style.color = '#000000'; // Set text color to black
        SecondStageCard.style.backgroundColor = 'transparent'; // Set background color to transparent
        ThirdStageCard.style.color = '#FFFFFF';
        ThirdStageCard.style.backgroundColor = '#1488DB';
    })
    const thirdBack=document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .third-stage .third-stage__foot .third-back')
    thirdBack.addEventListener("click",()=>{
        SecondStagetwo.style.display='flex';
        ThirdStage.style.display='none';
        ThirdStageCard.style.color = '#000000'; // Set text color to black
        ThirdStageCard.style.backgroundColor = 'transparent'; // Set background color to transparent
        SecondStageCard.style.color = '#FFFFFF';
        SecondStageCard.style.backgroundColor = '#1488DB';
    })
    const thirdNext=document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .third-stage .third-stage__foot .third-next')
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
// Update the thirdNext event listener to include file display
thirdNext.addEventListener("click", () => {
    // Gather print settings
    const paperSize = document.getElementById("size").value;
    const printMode = document.getElementById("mode").value;
    const pageCount = document.querySelector('.third-stage__setting-prop-num input').value;
    const copyCount = document.querySelector('.third-stage__setting-prop-copy input').value;

    // Store print settings
    const printSettings = {
        paperSize: paperSize,
        printMode: printMode,
        pageCount: pageCount,
        copyCount: copyCount
    };

    // Update fourth-stage with print settings and uploaded files
    updateFourthStage(printSettings);
    displayUploadedFiles(); // Display files in the fourth stage

    // Transition to fourth-stage
    ThirdStage.style.display = 'none';
    FourthStage.style.display = 'flex';
    ThirdStageCard.style.color = '#000000'; // Set text color to black
    ThirdStageCard.style.backgroundColor = 'transparent';
    FourthStageCard.style.color = '#FFFFFF';
    FourthStageCard.style.backgroundColor = '#1488DB';
});

// Function to update print settings display in fourth-stage
function updateFourthStage(settings) {
    const fourthStageDetails = document.querySelector('.fourth-stage__uploaded-file-prop');
    fourthStageDetails.innerHTML = `
        <p>Cỡ giấy: ${settings.paperSize}</p>
        <p>Số trang in: ${settings.pageCount}</p>
        <p>Chế độ in: ${settings.printMode === 'twoside' ? 'Hai mặt' : 'Một mặt'}</p>
        <p>Số lượng bản sao: ${settings.copyCount}</p>
    `;
}

    const fourthBack=document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .fourth-stage .fourth-stage__foot .fourth-back')
    fourthBack.addEventListener("click",()=>{
        ThirdStage.style.display='flex';
        FourthStage.style.display='none';
        FourthStageCard.style.color = '#000000'; // Set text color to black
        FourthStageCard.style.backgroundColor = 'transparent'; // Set background color to transparent
        ThirdStageCard.style.color = '#FFFFFF';
        ThirdStageCard.style.backgroundColor = '#1488DB';
    })
    const fourthNext=document.querySelector('.upload .inner-warp .inner-box .inner-main .inner-file .fourth-stage .fourth-stage__foot .fourth-next')
    fourthNext.addEventListener("click", () => {
        // Hide all stages and reset colors
        FourthStage.style.display = 'none';
        FirstStage.style.display = 'block';
    
        // Reset the process indicators
        FourthStageCard.style.color = '#000000';
        FourthStageCard.style.backgroundColor = 'transparent';
        FirstStageCard.style.color = '#FFFFFF';
        FirstStageCard.style.backgroundColor = '#1488DB';
    
        // Reset uploaded files view
        filewarpper.innerHTML = '';
        firstDiv.style.display = "flex";
        mainCont.style.display = "flex";
        subCont.style.display = "flex";
        fileW.style.height = "0";
        addMore.style.display = "none";
    
        // Clear uploaded files array
        uploadedFiles = [];
        Object.keys(printSettings).forEach(key => delete printSettings[key]);

    });
    
});
