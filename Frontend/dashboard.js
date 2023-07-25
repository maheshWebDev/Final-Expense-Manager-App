const addExpenseForm = document.getElementById('expense-form');

addExpenseForm.addEventListener('submit',sendExpense);



window.addEventListener('DOMContentLoaded',()=>{
    fetchExpense();
    updatePaginationControls();
});

document.getElementById('logout').addEventListener('click',()=>{
    window.location.replace("login.html")
})



async function sendExpense(e){
    // e.preventDefault();
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
       
        alert(error.response.data.message)
    }
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// get expenses

let currentPage = 1;
let totalPages = 1;

async function fetchExpense(){
  
    try {
    const token = localStorage.getItem("token")
     let decodedToken = parseJwt(token);
     let isPremium = decodedToken.isPremium
     if(isPremium){
        // document.getElementById('p-btn').style.visibility="hidden";
        document.getElementById('message').textContent = 'You are a premium user'
        document.getElementById('side-btn').innerHTML = `<li><button id="l-board" class="btn" Onclick="showLeaderboard()"><i class="fa fa-download"></i> Leaderboard</button></li>
        <li><button class="btn"><i class="fa fa-download"></i> Download</button></li>`
}
        console.log(decodedToken)
        console.log(currentPage)
        const response = await axios.get(`http://localhost:3000/expenses?page=${currentPage}`, { headers: { 'Authorization': token } });
        console.log(response)
       
        const data = response.data.data;
        console.log(data)
        showOnScreen(data);
          
        
            // Update the pagination controls
            
            totalPages = response.data.meta.totalPages;
            updatePaginationControls();

    } catch (error) {
        console.log(error)
    }

}


// Call this function to update the pagination controls
function updatePaginationControls() {
    // Get references to the pagination elements
    const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  const currentPageSpan = document.getElementById('currentPage');
    
  console.log("Current Page (Controls):", currentPageSpan);
  console.log("Total Pages:", totalPages);
  console.log("Prev Button:", prevPageBtn);
  console.log("Next Button:", nextPageBtn);
  
  console.log("Current Page:", currentPage);
  console.log("Total Pages:", totalPages);
    // Update the current page element
    currentPageSpan.textContent = `Page ${currentPage}`;
    console.log("currentPageSpan style:", currentPageSpan.style);
    // Enable or disable the "Previous" and "Next" buttons based on the current page
    if (prevPageBtn) {
        // The element exists, so you can safely modify its properties
        prevPageBtn.disabled = currentPage === 1;
      }
    // prevPageBtn.disabled = currentPage === 1;
    if(nextPageBtn){
        nextPageBtn.disabled = currentPage === totalPages;
    }
   
  }
  
  // Call this function when the "Previous" or "Next" button is clicked
  async function handlePagination(action) {
    if (action === 'prev' && currentPage > 1) {
      currentPage--;
     
      console.log("handlePagination called with action:", action);
      await fetchExpense(); // Fetch expenses for the new page
      console.log("Current Page (Prev):", currentPage);
    } else if (action === 'next' && currentPage < totalPages) {
      currentPage++;
      
      console.log("handlePagination called with action:", action);
      await fetchExpense(); // Fetch expenses for the new page
      
      console.log("Current Page (Next):", currentPage);
    }
  }


  function showOnScreen(arr) {
    const table = document.getElementById('table');
    
    // Clear existing content in the table
    table.innerHTML = '';
  
    arr.forEach((obj) => {
      const row = ` <tr id=${obj.id}>
        <td>${obj.name}</td>
        <td>${obj.amount}</td>
        <td>${obj.description}</td>
        <td><button type="submit" onclick="deleteExpense(${obj.id})">X</button></td>
      </tr>`;
      table.innerHTML += row;
    });
  }

async function deleteExpense(id){
    try {
        const token = localStorage.getItem('token')
        const response = await axios.delete(`http://localhost:3000/expenses/${id}`,{headers: {'Authorization':token}})
        console.log(response)
        if(response.status == 200){
            
            const parent = document.getElementById(id)
            parent.remove();
            updatePaginationControls()
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
              const res = await axios.post('http://localhost:3000/buy/update-status',{
                    order_id:options.order_id,
                    payment_id:response.razorpay_payment_id
                },
                {headers:{"Authorization":token}})

                alert('you are a premium user now')
                document.getElementById('p-btn').style.visibility="hidden";
                document.getElementById('message').textContent = 'You are a premium user'
                document.getElementById('side-btn').innerHTML = `<li><button id="l-board" class="btn" Onclick="showLeaderboard()"><i class="fa fa-download"></i> Leaderboard</button></li>
                <li><button class="btn"><i class="fa fa-download"></i> Download</button></li>`
                console.log(res)
                localStorage.setItem('token',res.data.token)
                
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

// leaderboard
// let leaderboardBtn = document.getElementById('l-board');

// console.log(leaderboardBtn)

async function showLeaderboard(){

try {
   const response = await axios.get('http://localhost:3000/premium/leaderboard');

   console.log(response.data.data.result)
   addDataToLeaderboard(response.data.data.result)

} catch (error) {
    console.log(error.response)
}
}

function addDataToLeaderboard (arr){
   const ele = document.getElementById('leaderboradone');
   ele.style.display = 'block';
    const parent = document.getElementById('leaderboard');
    arr.forEach((obj)=>{
        const child = `<div class="leaderboard-entry">    
        <span class="name">${obj.name}</span>
        <span class="amount">$${obj.totalAmount}</span>
      </div>`
      parent.innerHTML +=child;
    })
   
}







