const axios = require('axios');
const dev = require('../models/dev');
const parseStringArry = require('../utils/parseStringArray');
//request: vem do front-end 
//response: resposta ao front-end

//metodos HTTP: GET, POST, PUT, DELETE
// parametros:
// Query paramentros: resquest.query (Filtros, ordenação, paginação, ...)
// Route parametros:resquest.params (identificar um recurso na auteração ou remoção)
// body: request.body (Dados para criação ou alteração de um registro)

//controller possui 5 funcoes: index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const devs = await dev.find();
        console.log(devs);

        return response.json(devs);
    },

    async store(request, response) { //criando rota de requisição e resposta para o servidor
        const { github_user, techs, latitude, longitude } = request.body;

        let Dev = await dev.findOne({ github_user });

        if (!Dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_user}`);

            const { name, avatar_url, bio } = apiResponse.data;
            const techsArrays = parseStringArry(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            const Dev = await dev.create({
                github_user,
                name,
                avatar_url,
                bio,
                techs: techsArrays,
                location,
            })
        }
        return response.json(Dev);
    },

    async destroy(request, response) {
        const id = request.params.id;
        const Dev = await dev.deleteOne({
            _id: {
                $in: id,
            }
        })
        console.log(Dev);

        return response.json(Dev);
    },

    async update(request, response) {
        const id = request.params.id;
        const { techs, latitude, longitude } = request.body;
        const techsArrays = parseStringArry(techs);
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }
        const Dev = await dev.find({
            _id: {
                $in: id,
            }
        }).updateOne({
            Dev: id,
            techs: techsArrays,
            location,
        })
        console.log(Dev);

        return response.json(Dev);
    }


}