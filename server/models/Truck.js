const mongoose = require("mongoose");

const truckSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    days: {
        type: Array,
        required: true
    },
    menuList: {
        type: Array,
        required: true
    },
    mealList: {
        type: Array,
        required: true
    },
    subtitle: {
        type: String,
        required: [true, "No subtitle? Where are you going?"]
    },
    contact: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        required: function () {
            return true;
        }
    }
});

module.exports = mongoose.model("Truck", truckSchema);
