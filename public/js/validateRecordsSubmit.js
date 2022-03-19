const validatenewRecord = (function(){
    let form = document.querySelector('#newRecordForm')
    let employee = document.querySelector('#employeeID')
    let vacsType = document.querySelector('#vaccine')


    form.onsubmit = function(event){
        console.log("form submission detected")
        if(employee.value == "" || vacsType.value == ""){
            alert("Check that the Employee and Vaccine are valid")
            return false;
        }
    }
})()