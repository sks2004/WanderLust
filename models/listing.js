const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        url : String,
        filename : String
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner: {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    geometry : {
        type:{
            type: String,
            enum : ['Point'],
            required:true
        },
        coordinates : {
            type:[Number],
            required:true
        }
    },
    // category :{
    //     type:String,
    //     enum : ["mountains","arctic",""]
    // }
})

listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
})

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;


// {
//     type:String,
//     default: "https://images.unsplash.com/photo-1476984251899-8d7fdfc5c92c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     set: (v) => v==="" ? "https://images.unsplash.com/photo-1476984251899-8d7fdfc5c92c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v ,
// }