class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}


function createUserForm() {
    let userForm = document.getElementById("user-form")

    userForm.innerHTML += //create form
        `
    <form> 
    <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" required="required" placeholder="johndoe">
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" required="required" placeholder="password">
    </div>
    <button class="btn btn-success" type="submit">Log In</button>
    </form>
    `

    userForm.addEventListener("submit", userFormLogin) 
}


//creates new user 
// function userFormCreate(event) {
//     event.preventDefault();

//     let username = document.getElementById("username").value
//     let password = document.getElementById("password").value

//     let user = { username: username, password: password }

//     fetch(`${BASE_URL}/users`, {
//         method: "POST",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(user)
//     })
//         .then(res => res.json())
//         .then(user => {
//             let u = new User(user.username, user.password)
//         })
// }

//log in user 

function userFormLogin(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = { username: username, password: password }

    fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(resjson => {
            data = resjson

            console.log("loggedin", data)
            if (data.status === 200) {
                localStorage.setItem('loggedIn.username', data.username);
                localStorage.setItem('loggedIn.id', data.id);

                createListingForm()
                hideUserForm()
                renderLoggedInUser()
            }
            else {
                renderFailedLogin()
            }
        })
}

function renderLoggedInUser() {
    let welcome = document.getElementById("welcome")
    let loggedInUser = localStorage.getItem('loggedIn.username');
    welcome.innerText = `Welcome ${loggedInUser}!`
    welcome.innerHTML +=
        ` <button class="btn btn-warning" onclick="logout()">Log Out</button>`

    const listings = document.getElementById("listings-container");
    listings.innerHTML = ''

    fetch(`${BASE_URL}/listings`)
        .then(res => res.json())
        .then(listings => {
            for (const listing of listings) {
                let l = new Listing(listing.id, listing.imgsrc, listing.brand, listing.year, listing.size, listing.description, listing.title, listing.user_id)
                l.renderListing(); 
            }
        })
}

function hideUserForm() {
    let userForm = document.getElementById("user-form")
    userForm.style.display = 'none'
}

function renderFailedLogin() {
    alert("Login failed.")
}

function logout() {
    localStorage.clear()
    window.location.reload()
}