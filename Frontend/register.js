const registerForm = document.getElementById('register');
registerForm.addEventListener('submit',registerUser);

async function registerUser(e){
    e.preventDefault();
    try {
        const name = document.getElementById('r-name').value;
        const email = document.getElementById('r-email').value;
        const password = document.getElementById('r-password').value;

        const dataObj = {name,email,password}
       const responce = await axios.post('http://localhost:3000/user/signup',dataObj);
        console.log(responce);
        alert(responce.data.message)

    } catch (error) {
        console.log(error);
        alert(error)
    }
}