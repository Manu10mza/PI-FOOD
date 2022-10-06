const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const { API_KEY, API_KEY2, API_KEY3, API_KEY4 } = process.env;
//const { conn } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const API_now = API_KEY;
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//FUNCIONES

//API
const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_now}&&addRecipeInformation=true&&number=100`
    );
    //console.log(apiUrl);
    // } catch (error) {
    //  console.log("Error en la ruta API", error);
    // }
    // try {
    const apiInfo = await apiUrl.data.results.map((e) => {
      return {
        id: e.id,
        title: e.title,
        summary: e.summary,
        score: e.spoonacularScore,
        health: e.healthScore,
        steps: e.analyzedInstructions
          .map((r) => r.steps.map((s) => s.step))
          .join("||"),
        image: e.image,
        diets: e.diets,
      };
    });
    return apiInfo;
  } catch (error) {
    console.log("Error en el mapeo", error);
  }
};

//DD
const getDbInfo = async () => {
  try {
    return await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["title"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.log("Error en la llamada a BD", error);
  }
};

//Concatena

const getAllRecipes = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
  } catch (error) {
    console.log("Error en el joint de bd y API", error);
  }
};

// [ ] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado

router.get("/recipes", async (req, res) => {
  try {
    const name = req.query.name;
    //console.log("query", name);
    let recipesTotal = await getAllRecipes();
    //console.log("recipesTotal", recipesTotal);
    if (name) {
      //console.log("Into IF", name.toLowerCase());
      let recipeName = await recipesTotal.filter((e) =>
        e.title.toLowerCase().includes(name.toLowerCase())
      );
      // console.log("recipeName", recipeName);
      recipeName.length
        ? res.status(200).send(recipeName)
        : res.status(404).send("No está la receta");
    } else {
      res.status(200).send(recipesTotal);
    }
  } catch (error) {
    console.log("Error en la ruta GET", error);
  }
});

// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
//GET https://api.spoonacular.com/recipes/{id}/information

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const recipesTotal = await getAllRecipes();
  if (id) {
    let recipeId = await recipesTotal.filter((e) => e.id == id);
    recipeId.length
      ? res.status(200).json(recipeId)
      : res.status(400).send("Id not found");
  }
});

// [ ] GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá

router.get("/types", async (req, res) => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_now}&&addRecipeInformation=true&&number=100`
  );
  const apiDiets = apiUrl.data.results.map((e) => e.diets);
  const apiDiets1 = [
    "gluten free",
    "dairy free",
    "lacto ovo vegetarian",
    "vegan",
    "paleolithic",
    "primal",
    "pescatarian",
    "foodmap friendly",
    "whole 30",
  ];

  //console.log(apiDiets);
  const dietEach = apiDiets.flat(1);
  //1er filtro solo valores unicos
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  // Filter:
  var unique = dietEach.filter(onlyUnique);
  //console.log(dietEach);
  unique.forEach((e) => {
    Diet.findOrCreate({
      where: { title: e },
    });
  });
  const allDiets = await Diet.findAll();
  res.send(allDiets);
});
// [ ] POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos

router.post("/recipe", async (req, res) => {
  let { title, summary, score, health, steps, image, diets, createdInDb } =
    req.body;
  if (!title) return res.status(400).send({ error: "Must enter a title" });
  if (!summary) return res.status(400).send({ error: "Must enter a summary" });
  let recipeCreated = await Recipe.create({
    title,
    summary,
    score,
    health,
    steps,
    image,
    //diets,
    createdInDb,
  });
  let dietDb = await Diet.findAll({
    where: { title: diets },
  });
  recipeCreated.addDiet(dietDb);
  res.send("Recipe created");
});

module.exports = router;
