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
        <div class="card">  
        ${this.title} - 
        <img src ="${this.imgsrc}">
        <div class="card-body">
        - ${this.brand} - ${this.year} - ${this.size} - ${this.description}
        </div>
        </li>
  
        <button class="delete-button" data-id=${this.id} onclick="deleteListing()">Delete Listing</button>
        `
    }
}