const searchUser = (function(){
    let employeeSearch = document.querySelector('#employee')
    let autoComEmployee = document.querySelector('#employeeInput')
    let employeeID = document.querySelector('#employeeID')
    let vacsType = document.querySelector('#vaccine')
    let autoComVacs = document.querySelector('#vacsInput')
    let vacsID = document.querySelector('#vacsID')


    //Searches as you type an employee's name
    employeeSearch.addEventListener('input', (event)=>{
        fetch('/users/search?' + new URLSearchParams({employeeSearch : event.target.value}))
        .then(response => response.json())
        .then(data => updateAutoComEmployee(data))
    })

    //Sets the employeeID field whenever focus leaves the employee field
    employeeSearch.onblur = (event)=>{
        autoComEmployee.innerHTML = ""
        fetch('/users/search?' + new URLSearchParams({employeeSearch : event.target.value}))
        .then(response => response.json())
        .then(data =>{
            employeeID.value = data[0].persKey;
        })
    }

    function updateAutoComEmployee(arr){
        autoComEmployee.innerHTML = ''
        arr.forEach(obj=>{
            let option = document.createElement('option')
            option.innerHTML = obj.firstName + ' ' + obj.lastName
            option.value = option.innerHTML
            autoComEmployee.appendChild(option)
        })
    }

    vacsType.addEventListener('input', (event)=>{
        fetch('/vaccinations/search?' + new URLSearchParams({vacsType : event.target.value}))
        .then(response => response.json())
        .then(data => updateAutoComVacs(data))
    })

    vacsType.onblur = (event)=>{
        autoComVacs.innerHTML = ""
        fetch('/vaccinations/search?' + new URLSearchParams({vacsType : event.target.value}))
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            vacsID.value = data[0].vacsId;
        })
    }

    function updateAutoComVacs(arr){
        console.log(arr)
        autoComVacs.innerHTML = ''
        arr.forEach(obj=>{
            let option = document.createElement('option')
            option.innerHTML = obj.name
            option.value = option.innerHTML
            autoComVacs.appendChild(option)
        })
    }
    
})()