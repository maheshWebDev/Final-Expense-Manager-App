const addExpenseForm = document.getElementById('expense-form');
addExpenseForm.addEventListener('submit',sendExpense);

window.addEventListener('DOMContentLoaded',fetchExpense);

document.getElementById('logout').addEventListener('click',()=>{
    window.location.replace("login.html")
})

async function sendExpense(e){
    e.preventDefault();
    try {
        const token =  localStorage.getItem("token")
        console.log(token)
        const name = document.getElementById('name').value;
        const amount = document.getElementById('number').value;
        const description = document.getElementById('option').value;

        const dataObj = {name,amount,description};
        console.log(dataObj)
        const response = await axios.post('http://localhost:3000/expenses',dataObj,{headers: {'Authorization':token}});
        console.log(response)
    } catch (error) {
        console.log(error.response)
        alert(error.response.data.message)
    }
}

async function fetchExpense(){
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get('http://localhost:3000/expenses',{headers: {'Authorization':token}});
        // console.log(response.data.data);
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
        const token = localStorage.getItem('token')
        const response = await axios.delete(`http://localhost:3000/expenses/${id}`,{headers: {'Authorization':token}})
        console.log(response)
        if(response.status == 200){
            const parent = document.getElementById(id)
            parent.remove();
        }
        
        
    } catch (error) {
        console.log(error.response)
    }
   
}




// // premium button
document.getElementById('p-btn').addEventListener('click',async(e)=>{

    try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:3000/buy/premium-membership',{headers: {'Authorization':token}})

        console.log(response);
       
        var options = {
            "key":response.data.key_id,
            "order_id":response.data.order.id,
            "handler": async function (response){
                await axios.post('http://localhost:3000/buy/update-status',{
                    order_id:options.order_id,
                    payment_id:response.razorpay_payment_id
                },
                {headers:{"Authorization":token}})

                alert('you are a premium user now')
                
            
                
            },
        };

       const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

        rzp1.on('payment.failed',(response)=>{
            console.log(response);
            alert('something went wrong')
        });



        
    } catch (error) {
       alert("API key expired");
    }

})
