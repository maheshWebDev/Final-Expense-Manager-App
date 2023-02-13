const addExpenseForm = document.getElementById('expense-form');
addExpenseForm.addEventListener('submit',sendExpense);

window.addEventListener('DOMContentLoaded',fetchExpense);

async function sendExpense(e){
    // e.preventDefault();
    try {
        const name = document.getElementById('name').value;
        const amount = document.getElementById('number').value;
        const description = document.getElementById('option').value;

        const dataObj = {name,amount,description};
        console.log(dataObj)
        const response = await axios.post('http://localhost:3000/expenses',dataObj);
        console.log(response)
    } catch (error) {
        console.log(error.response)
        alert(error.response.data.message)
    }
}

async function fetchExpense(){
    try {
        const response = await axios.get('http://localhost:3000/expenses');
        console.log(response.data.data);
       showOnScreen(response.data.data)

    } catch (error) {
        console.log(error.response)
    }

}

function showOnScreen(arr){
const table = document.getElementById('table');
arr.forEach((obj)=>{
    const row = ` <tr id = ${obj.id}>
    <td>${obj.name}</td>
    <td>${obj.amount}</td>
    <td>${obj.description}</td>
    <td><button type="submit" Onclick="deleteExpense(${obj.id})" >X</button></td>
    </tr>`
table.innerHTML +=row
})
}

async function deleteExpense(id){
    try {
        const response = await axios.delete(`http://localhost:3000/expenses/${id}`)
        console.log(response)
        if(response.status == 200){
            const parent = document.getElementById(id)
            parent.remove();
        }
        
        
    } catch (error) {
        console.log(error.response)
    }
   
}