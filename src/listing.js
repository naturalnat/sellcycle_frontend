class Listing {
  constructor(id, imgsrc, brand, year, size, description, title, user_id) {

    this.id = id;
    this.imgsrc = imgsrc;
    this.brand = brand;
    this.year = year;
    this.size = size;
    this.description = description;
    this.title = title;
    this.user_id = user_id;
  }


  renderListing() {
    let listingsDiv = document.getElementById("listings-container")
    let loggedInUser = localStorage.getItem('loggedIn.id');

    listingsDiv.innerHTML +=
      `
        <div class="row">
          <div class="column">
            <div class="card" card-id=${this.id}>  
        <strong> ${this.title} </strong> <br>
        <img src="${this.imgsrc}" height=200px width=200px> <br>
        <div class="card-body">
        ${this.brand} - ${this.year} - size ${this.size}  <br>
        ${this.description} 
       `
    if (this.user_id == loggedInUser && loggedInUser != null && this.user_id != null) {
      listingsDiv.innerHTML += `<button class="delete-button" data-id=${this.id} onclick="deleteListing()">Delete Listing</button>`
    }
    listingsDiv.innerHTML += `<br>
        
        
        </div>
          </div>
        </div>       
        `
  }
}
