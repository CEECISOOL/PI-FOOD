const { Router } = require('express');
const axios = require('axios');
const { Diet } = require('../db');
const e = require('express');
const { API_KEY } = process.env

const router = Router();

router.get("/", async (req, res) => {
    let dietArr= []
const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=5222&addRecipeInformation=true&diet&apiKey=${API_KEY}`);
    dietsApi.data.results.map(e => {
        e.diets.forEach(el =>{
            if(!dietArr.includes(el)){
                dietArr = dietArr.concat(el)
            }
        })
    });

    res.send(dietArr);
})

module.exports = router;
