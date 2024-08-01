const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    
    imageUrl: {
        type: String,
        required: [true, "This field is required"]
    },
    cardname:{
        type:String,
        required: [true, "This field is required"],
        min: [0, "Minimum 5 chars"]
    },
    MinimumSalary: {
        type: Number,
        required: [true, "This field is required"],
        min: [0, "Minimum salary must be a positive number"]
    },
    AnnualFee: {
        type: Number,
        required: [true, "This field is required"],
        min: [0, "Annual fee must be a positive number"]
    },
    Rate: {
        type: Number,
        required: [true, "This field is required"],
        min: [0, "Rate must be a positive number"]
    },
    SalaryTransfer: {
        type: Boolean,
        required: [true, "This field is required"]
    },
    issuer :{
        type: String,
        required: [true, "This field is required"],

    }
});


const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
