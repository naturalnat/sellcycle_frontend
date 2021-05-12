document.addEventListener("DOMContentLoaded", () => {
    createForm();
    fetchListings()
})

const BASE_URL = "http://127.0.0.1:3000"

    // read - fetch listing 
function fetchListings(){
    fetch(`${BASE_URL}/listings`)
    .then(res => res.json()) //makes response (listings) json
    .then(listings => { 
        for (const listing of listings){ 
            let l = new Listing(listing.id, listing.imgsrc, listing.brand, listing.year, listing.size, listing.description, listing.title) //creates new JS object from rails obj 
            console.log(l)
            l.renderListing(); //listing class instance method 
        }
    })
}


    // create - create new listing        
         function createForm(){
             let listingForm = document.getElementById("listing-form")
             listingForm.innerHTML += //create form
             `
             <form> 
               Img Url:<input type="text" id="imgsrc"> <br>
               Brand: <input type="text" id="brand"> <br>
               Year:<input type="text" id="year"> <br>
               Size:<input type="text" id="size"> <br>
               Description:<input type="text" id="description"> <br>
               Title: <input type="text" id="title"><br>
               <input type="submit" value="Create Listing">
             </form>
             ` 

             listingForm.addEventListener("submit", listingFormSubmit) //adds event listener 
         }

         function listingFormSubmit(){
            event.preventDefault(); //prevents submission w/o values - need to fix this, does not work
            let imgsrc = document.getElementById("imgsrc").value
            let brand = document.getElementById("brand").value
            let year = document.getElementById("year").value
            let size = document.getElementById("size").value
            let description = document.getElementById("description").value
            let title = document.getElementById("title").value


            let listing = {imgsrc: imgsrc, 
                brand: brand, 
                year: year, 
                size: size, 
                description: description, 
                title: title
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
                let l = new Listing(listing.id, listing.imgsrc, listing.brand, listing.year, listing.size, listing.description, listing.title) 
                l.renderListing();
            })
         }
         
    // delete - delete listing 

    function deleteListing(){
        let listingid= parseInt(event.target.dataset.id)

        fetch(`${BASE_URL}/listings/${listingid}`, {
            method: 'DELETE'
        })
    }
    //todo - deletes from db but does not reflect w/o refresh  

