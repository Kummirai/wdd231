import courses from "./courses.js";

const subjects = document.querySelector(".subjects");
const buttons = document.querySelectorAll("button");

//Dynamically add courses into course section
let courseSection = "";

const fillCourses = ()=>{
    courses.map((course)=>{
        courseSection += `
            <div class="my-course class-odinary">
                <p>${course.title}</p>
            </div>
        `
    });
    subjects.innerHTML = courseSection;
    const myCourses = document.querySelectorAll(".my-course");
            const addCompletedStyles = courses.filter((complete)=>complete.isComplete)
            myCourses.forEach((course)=>{
                addCompletedStyles.forEach((completeCourse)=>{
                    if(course.innerText === completeCourse.title){
                        course.classList.add("class-complete")
                        course.classList.remove("class-odinary")
                    }
                })
            })
};

fillCourses();

//filter cousrse by category
const filterCourses = ()=>{
    buttons.forEach((button)=>{
        button.addEventListener("click", ()=>{
        courseSection = ""
        if(button.innerText === "ALL"){
            courses.map((course)=>{
                courseSection += `
                    <div class="my-course class-odinary">
                        <p>${course.title}</p>
                    </div>
                `
            });
            subjects.innerHTML = courseSection;
            const myCourses = document.querySelectorAll(".my-course");
            const addCompletedStyles = courses.filter((complete)=>complete.isComplete)
            myCourses.forEach((course)=>{
                addCompletedStyles.forEach((completeCourse)=>{
                    if(course.innerText === completeCourse.title){
                        course.classList.add("class-complete")
                        course.classList.remove("class-odinary")
                    }
                })
            })
            
            
        } else {
            const selectedCourses = courses.filter((course)=> course.category === button.innerText)
            selectedCourses.map((course)=>{
                courseSection += `
                    <div class="my-course class-odinary">
                        <p>${course.title}</p>
                    </div>
                `
                });
            subjects.innerHTML = courseSection;
            const myCourses = document.querySelectorAll(".my-course");
            const addCompletedStyles = courses.filter((complete)=>complete.isComplete)
            myCourses.forEach((course)=>{
                addCompletedStyles.forEach((completeCourse)=>{
                    if(course.innerText === completeCourse.title){
                        course.classList.add("class-complete")
                        course.classList.remove("class-odinary")
                    }
                })
            })
            }     
        });
    });
}

filterCourses();


