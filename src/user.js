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
      <input type="submit" value="Create User">
    </form>
    ` 

    userForm.addEventListener("submit", userFormSubmit) //adds event listener 
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
        console.log(u)
    })
 }

 //to do - display error message for taken username 