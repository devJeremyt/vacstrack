let unvaxd = document.querySelector('#unvaxd')
let vaxd = document.querySelector('#vaxd')
let circle = document.querySelector('circle')


//Get count of vaccinated/unvaccinated employees

fetch('/vaccinations/covidrates')
.then(res => res.json())
.then(data => data)
//Set value to screen

//Calculate graph and update