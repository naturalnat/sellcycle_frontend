class Listing{ //creates and initilizes object of listing class
    constructor(imgsrc, title, brand, year, size, description){

    this.imgsrc = imgsrc; 
    this.title = title; 
    this.brand = brand; 
    this.year = year; 
    this.size = size; 
    this.description = description;
    //this.location = location; //maybe rename location? 
    } 
}


//instance method that renders object to dom 