const dev = require('../models/dev');
const parseStringArry = require('../utils/parseStringArray');


module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;

        const techsArrays = parseStringArry(techs);
        const devs = await dev.find({
            techs: {
                $in: techsArrays,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude,latitude ],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        console.log(devs);

        return response.json(devs);

    }
}