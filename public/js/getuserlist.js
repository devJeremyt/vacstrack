
const searchFunction = (function(){
    let employeeSearch = document.querySelector('#employeeSearch')
    let autocomBox = document.querySelector('.autocom-box')

    employeeSearch.addEventListener('input', (event)=>{
        fetch('/users/search?' + new URLSearchParams({employeeSearch : event.target.value}))
        .then(response => response.json())
        .then(data => updateAutomComBox(data))
    })

    function updateAutomComBox(arr){
        console.log(arr)
        autocomBox.innerHTML = ''
        arr.forEach(obj=>{
            let li = document.createElement('li')
            let a = document.createElement('a')
            a.href = '/users/user?' + new URLSearchParams({id: obj.persKey})
            a.innerHTML = obj.firstName + ' ' + obj.lastName
            li.appendChild(a)
            autocomBox.appendChild(li)
        })
    }
    
})()