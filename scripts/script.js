import courses from "./courses.js";

const menu = document.querySelector(".fa-bars");
const nav = document.querySelector("nav");
const subjects = document.querySelector(".subjects");
const buttons = document.querySelectorAll("button");

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

//Dynamically add courses mto course section
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

//filter cousrse by category
buttons.forEach((button)=>{
    button.addEventListener("click", ()=>{
    courseSection = ""
    if(button.innerText === "ALL"){
        courses.map((course)=>{
            courseSection += `
                <div>
                    <p>${course.title}</p>
                </div>
            `
        });
        subjects.innerHTML = courseSection;
    } else {
        const selectedCourses = courses.filter((course)=> course.category === button.innerText)
        selectedCourses.map((course)=>{
            courseSection += `
                <div>
                    <p>${course.title}</p>
                </div>
            `
            });
        subjects.innerHTML = courseSection; 
        }     
    }); 
});





