let countPendingApproval = document.querySelector('#countPendingApproval')

fetch('/records/needapproval')
.then(response => response.json())
.then(data =>{
    console.log(data)
    countPendingApproval.innerHTML = data.length
})