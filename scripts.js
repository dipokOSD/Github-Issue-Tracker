// login page logic

const loginBtn=document.getElementById("login-btn")
loginBtn.addEventListener("click",()=>{
    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;
    
    if(username==="admin" && password==="admin123"){
        alert("Login Success")
        window.location.href = "main.html";
    }
    else {
        alert("Wrong Requared");
    }
})
// -----------------------------------------------
