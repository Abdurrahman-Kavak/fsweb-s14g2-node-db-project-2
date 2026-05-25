// HOKUS POKUS
const router = require("express").Router();

const { getAll, getById, create } = require("./cars-model");

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

router.get("/", (req, res, next) => {
  getAll()
    .then((cars) => {
      res.status(200).json(cars || []);
    })
    .catch(next);
});
router.get("/:id", checkCarId, (req, res, next) => {
  getById(req.params.id)
    .then((car) => {
      res.status(200).json(car);
    })
    .catch(next);
});
router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  (req, res, next) => {
    create(req.body)
      .then((car) => {
        res.status(201).json(car);
      })
      .catch(next);
  },
);

module.exports = router;
