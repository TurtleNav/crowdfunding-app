const Traveller = require('./traveller');
const Location = require('./location');
const Trip = require('./trip');

/*
Traveller.hasMany(Trip, {
    foreignKey: ""
})

Trip.hasOne(Location, {
    foreignKey: ""
})
*/

Location.belongsToMany(Traveller, {through: Trip, unique: false});
Traveller.belongsToMany(Location, {through: Trip, unique: false});

module.exports = {
    Traveller,
    Location,
    Trip
}