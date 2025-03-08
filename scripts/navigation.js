const menu = document.querySelector(".fa-bars");
const nav = document.querySelector("nav");
const navAchorTags = document.querySelectorAll(".navigation");
const homeAchorTag = document.querySelector("#home");




navAchorTags.forEach((anchor)=>{
        if(anchor.href === window.location.href){
            anchor.classList.add("active");
        } else {
            homeAchorTag.classList.add("active")
        }
});

menu.addEventListener("click", ()=>{
    let src = menu.getAttribute("src");
    if(src ==="images/menu.png"){
        menu.src = "images/close.png" 
    } else if (src === "images/close.png"){
        menu.src = "images/menu.png"
    }
})

//Toggle navbar on smaller screens
menu.addEventListener("click", ()=>{
    if(nav.classList.contains("none")){
        nav.classList.remove("none");
        nav.classList.add("show");
    } else {
        nav.classList.remove("show");
        nav.classList.add("none");
    }
});