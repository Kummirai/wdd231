import courses from "./courses.js";

const menu = document.querySelector(".fa-bars");
const nav = document.querySelector("nav");
const subjects = document.querySelector(".subjects");

menu.addEventListener("click", ()=>{
    if(nav.classList.contains("none")){
        nav.classList.remove("none");
        nav.classList.add("show");
    } else {
        nav.classList.remove("show");
        nav.classList.add("none");
    }
})

let courseSection = "";

const fillCourses = ()=>{
    courses.map((course)=>{
        courseSection += `
            <div>
                <p>${course.title}</p>
            </div>
        `
    });
    subjects.innerHTML = courseSection;
};

fillCourses();






