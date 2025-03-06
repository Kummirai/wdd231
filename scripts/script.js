import courses from "./courses.js";

const subjects = document.querySelector(".subjects");
const buttons = document.querySelectorAll("button");
const numberOfCourses = document.querySelector("#courses");

//Dynamically add courses into course section
let courseSection = "";

const fillCourses = ()=>{
    courses.map((course)=>{
        courseSection += `
            <div class="my-course class-odinary">
                <p>${course.subject} ${course.number}</p>
            </div>
        `
    });
    subjects.innerHTML = courseSection;
    const sum = courses.reduce((acc, course) => acc + course.credits, 0);
    numberOfCourses.innerHTML = sum;

    const myCourses = document.querySelectorAll(".my-course");
            const addCompletedStyles = courses.filter((complete)=>complete.completed)
            myCourses.forEach((course)=>{
                addCompletedStyles.forEach((completeCourse)=>{
                    const complete = `${completeCourse.subject} ${completeCourse.number}`;
                    if(course.innerText === complete){
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
                        <p>${course.subject} ${course.number}</p>
                    </div>
                `
            });
            subjects.innerHTML = courseSection;
            
            const sum = courses.reduce((acc, course) => acc + course.credits, 0);
            numberOfCourses.innerHTML = sum;

            const myCourses = document.querySelectorAll(".my-course");
            const addCompletedStyles = courses.filter((complete)=>complete.completed)
            myCourses.forEach((course)=>{
                addCompletedStyles.forEach((completeCourse)=>{
                    const complete = `${completeCourse.subject} ${completeCourse.number}`;
                    if(course.innerText === complete){
                        course.classList.add("class-complete")
                        course.classList.remove("class-odinary")
                    }
                })
            })
            
            
        } else {
            const selectedCourses = courses.filter((course)=> course.subject === button.innerText)
            selectedCourses.map((course)=>{
                courseSection += `
                    <div class="my-course class-odinary">
                        <p>${course.subject} ${course.number}</p>
                    </div>
                `
                });
            subjects.innerHTML = courseSection;

            const sum = selectedCourses.reduce((acc, course) => acc + course.credits, 0);
            numberOfCourses.innerHTML = sum;

            const myCourses = document.querySelectorAll(".my-course");
            const addCompletedStyles = courses.filter((complete)=>complete.completed)
            myCourses.forEach((course)=>{
                addCompletedStyles.forEach((completeCourse)=>{
                    const complete = `${completeCourse.subject} ${completeCourse.number}`;
                    if(course.innerText === complete){
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


