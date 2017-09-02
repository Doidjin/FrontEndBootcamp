var faker = require('faker');

for(var i = 0; i < 10; i++){
    var productNames = faker.name.findName();
    var productPrices = faker.commerce.price();
    
    console.log("Name- " + productNames + " Price-> " + productPrices);
}