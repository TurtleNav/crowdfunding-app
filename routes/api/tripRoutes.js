const router = require('express').Router();

const { Traveller, Trip, Location } = require('../../models');

// GET all trips
router.get('/', async (req, res) => {
    try {
        const tripData = await Trip.findAll();
        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add a new trip
router.post('/', async (req, res) => {
    try {
        const tripData = await Trip.create({
            trip_budget: req.body.trip_budget,
            traveller_amount: req.body.traveller_amount,
            
        });
        res.status(200).json(tripData);
    } catch(err) {
        res.status(400).json(err);
    }
});

// GET a single trip
router.get('/:id', async (req, res) => {
    try {
        const tripData = await Trip.findByPk(req.params.id);
        if (!tripData) {
            res.status(404).json({ message: 'No trip found with that id!' });
            return;
        }
        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// remove a trip
router.delete('/:id', async (req, res) => {
    try {
        const tripData = await Trip.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!tripData) {
            res.status(404).json({ message: 'No trip found with that id!' });
            return;
        }

        res.status(200).json({ message: `Trip with id: ${req.params.id} was successfully removed`});
    } catch (err) {
        res.status(500).json(err);
    } 
});

module.exports = router;