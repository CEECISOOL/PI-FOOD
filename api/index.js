const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Diet } = require('../api/src/db');


async function dietCreate() {
  let defaultDiet = [
    "gluten free",
    "vegan",
    "paleolithic",
    "primal",
    "whole 30",
    "pescatarian",
    "ketogenic",
    "fodmap friendly",
    "vegetarian",
    "lacto vegetarian",
    "ovo vegetarian"
  ]

  defaultDiet.map(e => {
    Diet.findOrCreate({
    where: {name: e}
})
})
}

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    try {
      dietCreate()
    } catch (error) {
      console.log(error)
    }
  });
});

