const menu = document.querySelector(".fa-bars");
const nav = document.querySelector("nav");
const navAchorTags = document.querySelectorAll(".navigation");


navAchorTags.forEach((anchor)=>{
        if(anchor.href === window.location.href){
            anchor.classList.add("active");
        }
});

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