const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().
    then(()=>{
        console.log("Connection Sucessfull");
    })
    .catch((err)=>{
        console.log(err);
    })

async function main(){
    await mongoose.connect(Mongo_URL);
}

const intiDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner : "668f180305f338b11b85f57f"}));
    await Listing.insertMany(initData.data);
    console.log("Data initialized");
}
intiDB();