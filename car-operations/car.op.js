const { sellers } = require('../agency-operations/obj')
const carMarket = require('../main-object/obj')

/***************************************************** */

const getCustomerByName = function (customerName) {
    const findCustomer = carMarket.customers.find((customer) => customer.name === customerName);
  
    return findCustomer;
  };
/****************************************************** */
const findCarById = function (carId) {
    let foundCar = null;
  
    carMarket.sellers.forEach((seller) => {
      seller.cars.forEach((car) => {
        car.models.forEach((model) => {
          if (model.carNumber === carId) {
            // fill the details to foundCar
            foundCar = {
              modelName: model.name,
              carNumber: model.carNumber,
              carPrice:  model.price,
            };
          }
        });
      });
    });
  
    return foundCar;
  };
  

/******************************************************* */

const sellCar = function(agency,carId,customer){
        const theAgency = carMarket.findAgency(agency);
        const theCustomer = getCustomerByName(customer);
        const findCar = findCarById(carId);

        if (findCar){
            if (theCustomer.cash >= findCar.carPrice){
                theCustomer.cash -= findCar.carPrice
                theAgency.cash += findCar.carPrice
            }
            else{
                //customer cash less than the car price ,buy with available cash + credit
                theAgency.cash = theAgency.cash + theCustomer.cash;
                theAgency.credit = Math.abs(findCar.carPrice - theCustomer.cash)+theAgency.credit;
                theCustomer.cash -= findCar.carPrice;
            }
        }
        return theAgency
}

/******************************************************** */


// invoke the function
const carIdToFind = "S6DL1";
// const foundCar = findCarById(carIdToFind);
// console.log(foundCar)

const res = sellCar('Best Deal',carIdToFind,'Ravi Murillo')
console.log(res)

