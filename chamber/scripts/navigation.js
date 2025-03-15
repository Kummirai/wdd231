const menu = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menu.addEventListener("click", ()=>{
    navigation.classList.toggle("show");
    menu.classList.toggle("close");
});