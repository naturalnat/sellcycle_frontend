let loggedIn = null

class User{
    constructor(username, password){
        this.username = username; 
        this.password = password; 
    }
}


function createUserForm(){
    let userForm = document.getElementById("user-form")  

    userForm.innerHTML += //create form
    `
    <form> 
      Username:<input type="text" id="username" required="required"> <br>
      Password: <input type="text" id="password" required="required"> <br>
      <button class="createbtn" type="submit">Log In</button>
    </form>
    ` 

    userForm.addEventListener("submit", userFormLogin) //adds event listener 
}



//creates new user 
function userFormCreate(event){
    event.preventDefault(); 
    
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    let user = {username: username, password: password}

    fetch(`${BASE_URL}/users`, {  
        method: "POST", 
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(user => {
        let u = new User(user.username, user.password) 
    })
 }


 function userFormLogin(event){
    event.preventDefault(); 

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = {username: username, password: password}


    fetch(`${BASE_URL}/users/login`, {  
        method: "POST", 
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(resjson => { loggedIn = resjson 
        // localStorage.setItem("user", JSON.stringify(resjson.data));
        // console.log("storage", localStorage)
        console.log(loggedIn)
        }
      ) 

      //to do: fix this 


    createListingForm()
    hideUserForm()
    renderLoggedInUser()
   
    }

    function hideUserForm(){
        let userForm = document.getElementById("user-form")
        
        userForm.style.display = 'none'
    }

    function renderLoggedInUser(){
    let welcome = document.getElementById("welcome")
    welcome.innerText = `Welcome ${loggedIn}!`
    welcome.innerHTML +=
    ` <button class="logoutbtn" onclick="logout()">Log Out</button>`
    }