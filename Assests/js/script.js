let loginEmail = document.querySelector("#loginEmail");

let loginPassword = document.querySelector("#loginPassword");
let loginSubmit = document.querySelector("#loginSubmit");
let incorrect = document.querySelector("#incorrect")

let signupName = document.querySelector("#signupName");
let signupEmail = document.querySelector("#signupEmail");
let signupPassword = document.querySelector("#signupPassword");
let signupSubmit = document.querySelector("#signupSubmit");

let notValidEmail = document.querySelector("#notValidEmail");

let welcomeUser = document.querySelector(".welcomeWord");

let logout = document.querySelector("#logout")

//for minmize the input value and text color
document.querySelectorAll("input").forEach((input)=>{
    input.style.color = "white";
    input.addEventListener("input",function(){
        this.style.textTransform = "lowercase";
    })
})
if(logout != null){
    logout.addEventListener("click",function(){
        logoutUser()
    })
}
function logoutUser(){
    localStorage.removeItem("username")
}

let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")): [];

// for welcome
let username = localStorage.getItem("username");
if(username){
    welcomeUser.innerHTML = `welcome ${username}`
}



if(loginSubmit !== null){

loginSubmit.addEventListener("click",function(e){

    e.preventDefault()
        if(users.length === 0){
            incorrect.classList.replace("d-none","d-block");
            return false;
        }else if(users.length >= 1){
            for(let i =0;i<users.length;i++){
                if(users[i].email == loginEmail.value && users[i].password == loginPassword.value){  
                    localStorage.setItem("username",JSON.stringify(users[i].name))
                    location.href = "home.html";
                   

                } 
            }
        }
        history.replaceState(null, null, "ggg.html");
  
    })
}

    


if(signupSubmit != null){
    signupSubmit.addEventListener("click",function(e){
    
        e.preventDefault();
        if(validateEmail()){
          
            if(users.length > 1){
                for(let i = 0 ;i<users.length;i++){
        
                    if(users[i].email == signupEmail.value){
                        notValidEmail.classList.replace("d-none","d-block");
                        return false
                    }
                }
                notValidEmail.classList.replace("d-block","d-none");
                createUser(users);
                emptyInputs();
                location.href = "login.html";
        
              
            }
            else{
                createUser(users);
                emptyInputs();
                location.href = "login.html";
               
                
            }
        }
        else{
            notValidEmail.classList.replace("d-none","d-block");
            return false;
        }
     
       
       
    })
}



function createUser(users){
    let obj = {
        name:signupName.value,
        email:signupEmail.value,
        password:signupPassword.value
    }
    users.push(obj);
    addToLocalStorage(users)
}

function addToLocalStorage(users){
    localStorage.setItem("users",JSON.stringify(users))
}

function emptyInputs(){
    signupEmail.value = "";
    signupName.value = "";
    signupPassword.value = "";
}

function validateEmail(){
    let emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return  emailValid.test(signupEmail.value);
}