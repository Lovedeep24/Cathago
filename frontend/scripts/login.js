function toggleForm() {
    const loginContainer = document.getElementById('loginContainer');
    const signupContainer = document.getElementById('signupContainer');
    
    if (loginContainer.style.display === 'none') {
        loginContainer.style.display = 'block';
        signupContainer.style.display = 'none';
    } else {
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'block';
    }
}

async function login(event) {
    event.preventDefault();
    window.location.href = 'userInfo.html';
    // const email = document.getElementById('email').value;
    // const password = document.getElementById('password').value;
    
    // const response = await fetch('http://localhost:5000/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    // });
    // if(response.status === 200)
    // {
    //     alert("Login successfull");
    //     window.location.href = 'user.html';
    // }
    // else{
    //     alert("Login failed");
    // }
    // const data = await response.json();
    // alert(data.message);
}

async function signup(event) {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmpassword = document.getElementById('confirmPassword').value;
    
    if(password === confirmpassword)
    {
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
    }
    else{
        alert("Password do not match");
    }
  
    const data = await response.json();
    alert(data.message);
}