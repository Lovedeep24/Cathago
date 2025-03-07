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
    try {
        event.preventDefault();
        console.log("Form submission prevented");
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.querySelector('input[name="role"]:checked').value;

        if (!email || !password) {
            alert("Must enter email and password");
            return;
        }

        console.log("Sending request...");
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password ,role})
        });

        console.log("Response received", response);
        
        if (response.status === 200) {
            const data = await response.json();
            // console.log("Login successful, redirecting...");
            if(role === 'admin')
            {
                localStorage.setItem("token", data.accessToken);
                window.location.href = 'admin.html';
            }
            else if(role === 'user')
            {
                localStorage.setItem("token", data.accessToken);
                localStorage.setItem("userId", data.userId);  
                window.location.href = 'uploadFile.html';
            }
            else{
                alert("Not Authorised");
            }
        } else if(response.status === 401) {
            alert("Unauthorized Access");
        }else if(response.status === 404) {
            alert("Email not registerd");
        }else if(response.status === 402) {
            alert("Invalid Password");
        }
        else{
            alert("Login Failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred, please try again.");
    }
}


async function signup(event) {
    event.preventDefault();

    const email = document.getElementById('signupEmail').value;
    const userName = document.getElementById('name').value;
    const password = document.getElementById('signupPassword').value;
    const confirmpassword = document.getElementById('confirmPassword').value;
    console.log(email,userName,password,confirmpassword);
    if(!email || !userName || !password || !confirmpassword)
    {
        alert("All Fields are Required")
    }
    else if(password === confirmpassword)
    {
        var response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName,email, password })
        });
    }
    else{
        alert("Password do not match");
    }
    console.log(response);
    if(response.status === 200)
    {
        alert("Signed Up successfully");
        window.location.href = 'login.html';
    }else{
        alert("something went wrong");
    }
  
} 