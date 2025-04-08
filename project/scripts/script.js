const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const currentDate = new Date();
const thisYear =  currentDate.getFullYear();

currentYear.innerHTML = thisYear;
lastModified.innerHTML = document.lastModified;
