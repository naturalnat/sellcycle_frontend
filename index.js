document.addEventListener("DOMContentLoaded", () => {
    fetchListings()
})

const BASE_URL = "http://127.0.0.1:3000"

    // read - fetch listing 
function fetchListings(){
    fetch(`${BASE_URL}/listings`)
    .then(res => res.json()) //makes response (listings) json 
    .then(listings => { 
        for (const listing of listings){ 
            let l = new Listing(listing.imgsrc, listing.title, listing.brand, listing.year, listing.size, listing.description) //creates new JS object from rails obj 
            console.log("js obj", l)
            l.renderListing();
        }
    })
}


    // create - create new listing 
    // delete - delete listing 