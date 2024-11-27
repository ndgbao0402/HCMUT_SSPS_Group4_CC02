const buttonAngleLeft = document.querySelector(".upload .inner-left .inner-tag .inner-dash button");
const innerLeft = document.querySelector(".upload .inner-left");
const innerMain = document.querySelector(".upload .inner-warp  .inner-main");
const innerShort = document.querySelector(".upload .inner-warp .inner-box .inner-short");
buttonAngleLeft.addEventListener("click",()=> {
    innerLeft.style.display = "none"; 
    innerMain.style.width = "100%";
})
innerShort.addEventListener("click",()=>{
    innerLeft.style.display = "block";
    innerMain.style.width = "80%";
})
