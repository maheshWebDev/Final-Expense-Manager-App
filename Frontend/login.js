const loginForm = document.getElementById('login');
loginForm.addEventListener('submit',loginUser);

async function loginUser(e){
    e.preventDefault();
    try {
        const email = document.getElementById('l-email').value;
        const password = document.getElementById('l-password').value;

        const dataObj = {email,password};
        const response = await axios.post('http://localhost:3000/user/login',dataObj);
        console.log(response);
        alert(response.data.message)
       
    } catch (error) {
        console.log(error.response.data.message)
       alert(error.response.data.message)
    }
}