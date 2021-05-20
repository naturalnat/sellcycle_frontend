class Listing{ //creates and initilizes object of listing class
    constructor(id, imgsrc, brand, year, size, description, title){

    this.id = id; 
    this.imgsrc = imgsrc; 
    this.brand = brand; 
    this.year = year; 
    this.size = size; 
    this.description = description;
    this.title = title; 
    } 
    //instance method that renders object to dom 
  
    renderListing() {
        let listingsDiv = document.getElementById("listings-container")

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
        <br>
        <button class="delete-button" data-id=${this.id} onclick="deleteListing()">Delete Listing</button>
             </div>
          </div>
        </div>       
        `
    }
}