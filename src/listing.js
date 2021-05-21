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
      listingsDiv.innerHTML += `<button class="delete-button" data-id=${this.id} onclick="logout()">Delete Listing</button>`
    }
  }
}


function createListingForm() {
  let listingForm = document.getElementById("listing-form")
  listingForm.innerHTML += 
      `
           <form> 
             <input type="text" id="title" required="required" placeholder="title"><br>
             <input type="text" id="imgsrc" required="required" placeholder="image url"> <br>
             <input type="text" id="brand" required="required" placeholder="brand"> <br>
             <input type="text" id="year" required="required" placeholder="year"> <br>
             <input type="text" id="size" required="required" placeholder="frame size (cm)"><br>
             <input type="text" id="description" required="required" placeholder="write a description"> <br>
             
             <input type="submit" class="btn btn-primary" value="Create Listing">
           </form>
           `

  listingForm.addEventListener("submit", listingFormSubmit) 
}

function listingFormSubmit(event) {
  event.preventDefault();
  let imgsrc = document.getElementById("imgsrc").value
  let brand = document.getElementById("brand").value
  let year = document.getElementById("year").value
  let size = document.getElementById("size").value
  let description = document.getElementById("description").value
  let title = document.getElementById("title").value
  let user_id = localStorage.getItem('loggedIn.id');


  let listing = {
      imgsrc: imgsrc,
      brand: brand,
      year: year,
      size: size,
      description: description,
      title: title,
      user_id: user_id
  }

  fetch(`${BASE_URL}/listings`, {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(listing)
  })
      .then(res => res.json())
      .then(listing => {
          let l = new Listing(listing.id, listing.imgsrc, listing.brand, listing.year, listing.size, listing.description, listing.title, listing.user_id)
          l.renderListing();
      })
}


function deleteListing(event) {
  let listingid = event.target.dataset.id

  fetch(`${BASE_URL}/listings/${listingid}`, {
      method: 'DELETE'
  })
  .then(renderNew())
}

function renderNew() { //re-render listings after delete 
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

