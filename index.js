document.addEventListener("DOMContentLoaded", () => {
    fetchListings();
    createUserForm();
})

const BASE_URL = "http://127.0.0.1:3000"


function fetchListings() {
    fetch(`${BASE_URL}/listings`)
        .then(res => res.json()) 
        .then(listings => {
            for (const listing of listings) {
                let l = new Listing(listing.id, listing.imgsrc, listing.brand, listing.year, listing.size, listing.description, listing.title, listing.user_id) 
                l.renderListing();
            }
        })
}