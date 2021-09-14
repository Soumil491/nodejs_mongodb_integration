const updateButton = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

updateButton.addEventListener('click', () => {
    //hit the update end point
    console.log('update event Trriggered');
    const payload ={
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            empName : document.querySelector('#update-empName').value,
            newEmpName : document.querySelector('#update-newEmpName').value,
            newEmpID : document.querySelector('#update-newEmpID').value
        })
    }
    fetch('/updateEmployee',payload)
    .then(res=>{
        if(res.ok) return res.json()
    })
    .then(response => {
        window.location.reload();
    })
})

deleteButton.addEventListener("click", () => {
    //hit the delete end point    
    console.log('delete event Trriggered');
    const payload ={
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            empName : document.querySelector('#delete-empName').value,
        })
    }
    fetch('/deleteEmployee',payload)
    .then(res=>{
        if(res.ok) return res.json()
    })
    .then(response => {
        if(response === 'delete op failed')
        console.log('delete op failed');

    })
    .catch(error => console.error(error));
});