const router = require('express').Router();

const { Traveller, Trip, Location } = require('../../models');

// GET all travellers WITHOUT associated trip data
router.get('/', async (req, res) => {
    try {
        const travellerData = await Traveller.findAll();
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add a new traveller
router.post('/', async (req, res) => {
    try {
        const travellerData = await Traveller.create({
            name: req.body.name, email: req.body.email
        });
        res.status(200).json(travellerData);
    } catch(err) {
        res.status(400).json(err);
    }
});

// GET a single traveller WITH associated trip data and their locations
router.get('/:id', async (req, res) => {
    try {
        const travellerData = await Traveller.findByPk(req.params.id, {include: [{model: Location, through: Trip}]});
        if (!travellerData) {
            res.status(404).json({ message: 'No traveller found with that id!' });
            return;
        }
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// remove a traveller
router.delete('/:id', async (req, res) => {
    try {
        const travellerData = await Traveller.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!travellerData) {
            res.status(404).json({ message: 'No traveller found with that id!' });
            return;
        }

        res.status(200).json({ message: `Traveller with id: ${req.params.id} was successfully removed`});
    } catch (err) {
        res.status(500).json(err);
    } 
});

module.exports = router;