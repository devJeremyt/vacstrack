const searchUser = (function(){
    let employeeSearch = document.querySelector('#employee')
    let autocomBox = document.querySelector('#employeeInput')
    let employeeID = document.querySelector('#employeeID')

    employeeSearch.addEventListener('input', (event)=>{
        fetch('/users/search?' + new URLSearchParams({employeeSearch : event.target.value}))
        .then(response => response.json())
        .then(data => updateAutomComBox(data))
    })

    employeeSearch.onblur = (event)=>{
        console.log(" On Blur hit")
        employeeInput.innerHTML = ""
        fetch('/users/search?' + new URLSearchParams({employeeSearch : event.target.value}))
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            employeeID.value = data[0].persKey;
        })
    }

    function updateAutomComBox(arr){
        console.log(arr)
        autocomBox.innerHTML = ''
        arr.forEach(obj=>{
            let li = document.createElement('li')
            li.innerHTML = obj.firstName + ' ' + obj.lastName
            li.onclick = function(event){employeeSearch.value = event.target.innerHTML }
            autocomBox.appendChild(li)
        })
    }
    
})()