const buttonAngleLeft = document.querySelector(".inner-view-main .inner-containner .inner-left .inner-tag .inner-dash button");
const innerLeft = document.querySelector(".inner-view-main .inner-containner .inner-left");
const innerMain = document.querySelector(".inner-view-main .inner-containner .inner-body .inner-right");
const innerShort = document.querySelector(".inner-view-main .inner-containner .inner-body button");
const xbutton = document.querySelector(".inner-view-main .inner-view-main__window .inner-view-main__window--header button");
const detail = document.querySelector(".inner-view-main .inner-view-main__window");
const plusopen = document.querySelectorAll(".inner-view-main .inner-containner .inner-body .inner-right .inner-table table tbody tr td button")
buttonAngleLeft.addEventListener("click",()=> {
    innerLeft.style.display = "none"; 
    innerMain.style.width = "100%";
    innerMain.style.justifyContent = "center";
})
innerShort.addEventListener("click",()=>{
    innerLeft.style.display = "block";
    innerMain.style.width = "80%";
    innerMain.style.justifyContent = "space-between";
})
xbutton.addEventListener("click",()=>{
    detail.style.display ="none";
})
plusopen.forEach(button => {
    button.addEventListener("click", () => {
        detail.style.display = "block";
    });
});


