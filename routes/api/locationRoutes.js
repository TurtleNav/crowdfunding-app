const router = require('express').Router();

const { Traveller, Trip, Location } = require('../../models');

// GET all locations
router.get('/', async (req, res) => {
    try {
        const locationData = await Location.findAll();
        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add a new location
router.post('/', async (req, res) => {
    try {
        const locationData = await Location.create({
            location_name: req.body.location_name
        });
        res.status(200).json(locationData);
    } catch(err) {
        res.status(400).json(err);
    }
});

// GET a single location
router.get('/:id', async (req, res) => {
    try {
        const locationData = await Location.findByPk(req.params.id);
        if (!locationData) {
            res.status(404).json({ message: 'No location found with that id!' });
            return;
        }
        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// remove a location
router.delete('/:id', async (req, res) => {
    try {
        const locationData = await Location.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!locationData) {
            res.status(404).json({ message: 'No location found with that id!' });
            return;
        }

        res.status(200).json({ message: `Location with id: ${req.params.id} was successfully removed`});
    } catch (err) {
        res.status(500).json(err);
    } 
});

module.exports = router;