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
        
        //Mark completed courses
        // const completeCourses = courses.filter((course)=> course.isComplete)
        // completeCourses.forEach((completeCourse)=>{
        //         myCourses.forEach((course)=>{
        //         if(course.innerText === completeCourse.title){
        //             course.classList.add("class-complete")
        //             }  
        //         });
        //     });
    });
}

filterCourses();


