const router = require("express").Router();
let Excercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Excercise.find({ name: req.query.name })
    .then((excercises) => res.json(excercises))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/add").post((req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const newExercise = new Excercise({
      name,
      description,
      duration,
      date,
    });
    newExercise
      .save()
      .then(() => res.json(" exercise added!"))
      .catch((err) => res.status(400).json("Error : " + err));
  } catch (error) {
    res.status(400).json("Error : " + error);
  }
});
router.route("/:id").get((req, res) => {
  Excercise.findById(req.params.id)
    .then((excercise) => res.json(excercise))
    .catch((err) => res.status(400).json("Error : " + err));
});
router.route("/:id").delete((req, res) => {
  Excercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("excercise deleted"))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/update/").put((req, res) => {
  Excercise.findById(req.body.id)
    .then((excercise) => {
      excercise.name = req.body.name ?? excercise.name;
      excercise.description = req.body.description ?? excercise.description;
      excercise.duration = Number(req.body.duration ?? excercise.duration);
      excercise.date = Date.parse(req.body.date ?? excercise.date);

      excercise
        .save()
        .then(() => res.json("exercise updated!!"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
