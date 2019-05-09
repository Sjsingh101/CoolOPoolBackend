var mongoose   = require("mongoose");
var Bus    = require("./models/bus");

var data = [
    {
        src:  "Delhi",
        dest: "Agra",
        price: 400, 
        company: "Stark Ltd"
    },
     {
        src:  "Delhi",
        dest: "Rishikesh",
        price: 1200 , 
        company: "Holis Ltd"
    },
     {
        src:  "Haridwar",
        dest: "Dehradun",
        price: 250, 
        company: "Bali Ltd"
    }
]

function seedDB(){
    //remove all bus
        Bus.deleteMany({}, function(err){ 
        if(err){
            console.log(err);
        }
        
        //add a few Buss
  data.forEach(function(seed){ 
        Bus.create(seed,function(err, Bus){
               if(err){
                   console.log(err);
               }else{
                   console.log("added a bus");
               }
          });
      });
 });

}


module.exports = seedDB;