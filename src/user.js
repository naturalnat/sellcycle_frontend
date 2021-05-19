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
      <button class="createbtn" type="submit">Create</button>
    </form>
    ` 

    userForm.addEventListener("submit", userFormLogin) //adds event listener 
}




function userFormSubmit(event){
    event.preventDefault(); //prevents submission w/o values - need to fix this, does not work
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
    .then(resjson => console.log(resjson))  
    //if resjeson == true, then set local storage session, 
    //user = logged in 
    //else show error message
    }
