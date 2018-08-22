const mongoose = require("mongoose");
let Truck = require("../models/Truck");

module.exports = {
    getAll: (req, res) => {
        Truck.find((err, trips) => {
            if (err) {
                handleError(res, err.message, "Failed to get trucks by day");
            } else {
                res.status(200).json(trips);
            }
        });
    },

    getTrucksByDay: (req, res) => {
        const day = +req.params.day;

        Truck.find({days: day}, (err, trips) => {
            if (err) {
                handleError(res, err.message, "Failed to get trucks by day");
            } else {
                res.status(200).json(trips);
            }
        });
    },

    getTrip: (req, res) => {
        const filters = { _id: mongoose.Types.ObjectId(req.params.id) };

        Truck.findOne(filters, (err, trip) => {
            if (err) {
                handleError(res, err.message, "Failed to get foodtruck");
              } else {

                console.log(trip);
                
                res.status(200).json(trip);
              }
        });
    },

    saveTruck: (req, res) => {
        let data = {
            name: req.body.name,
            days: req.body.days,
            mealList: req.body.mealList,
            mealList: req.body.mealList,
            subtitle: req.body.subtitle,
            contact: req.body.contact,
            description: req.body.description,
        };

        if (req.body.id) data._id = req.body.id;
        let trip = new Truck(data);

        // Validation
        var error = trip.validateSync();
        if (error && error.errors) {
            for (key in error.errors) {
                handleError(res, key, "Failed to create new foodtruck.");
            }
        }

        // Update
        if (req.body.id) {
            trip.update(trip, (err, trip) => {
                if (err) {
                    handleError(res, err.message, "Failed to create new foodtruck.");
                }
                
                return res.status(201).json(trip);
            });
            // Insert
        } else {
            Truck.create(data, (err, data) => {
                if (err) {
                    handleError(res, err.message, "Failed to create new foodtruck.");
                }
                
                return res.status(201).json(trip);
            });
        }
    },

    deleteTruck: (req, res) => {
        const query = { _id: mongoose.Types.ObjectId(req.params.id) };

        Truck.findOne(query, (err, trip) => {
            if (trip) {
                trip.remove();
                res.status(200).json(req.params.id);
            } else {
                handleError(res, "Failed to delete foodtruck", "Failed to delete foodtruck");
            }
        });
    }
};


function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({
      error: message
    });
  }