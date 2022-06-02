const { Router } = require('express');
const axios = require('axios');
const { Diet } = require('../db');
const { API_KEY } = process.env;
const router = Router();
const infoTotal = require('../../info.json');


router.get("/", async (req, res) => {
    let dietArr = [];
    //const dietsApi = infoTotal
    const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=5222&addRecipeInformation=true&diet&apiKey=${API_KEY}`);
    dietsApi.data.results.map(e => {
        e.diets.forEach(el => {
            if (!dietArr.includes(el)) {
                dietArr = dietArr.concat(el)
            }
        })
    });

   /* let dietDb = await Diet.findAll({
        attributes: ['name']
    });

    dietDb.forEach(el => {
        if (!dietArr.includes(el.name)) {
            dietArr = dietArr.concat(el.name)
        }
    })

    dietArr.forEach(el => {
        Diet.findOrCreate({
            where: { name: el }
        })
    })

    */

    return res.send(dietArr);
})

module.exports = router;
