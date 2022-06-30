const router = require('express').Router();
const { Category, Product } = require('../../models');
const Joi = require('joi')

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [
      Product
    ]
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: [Product]
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  console.info(`${req.method} request received to create category`);

  // create a new category
  Category.create(req.body)
  res.send('hello')
});

router.put('/:id', (req, res) => {
  console.info(`${req.method} request received to update a category`)
  console.log(req.body)



  const { id } = req.params

  Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  })

  res.send(`category with the id ${id} has been updated`)
});

router.delete('/:id', (req, res) => {

  // delete a category by its `id` value
});

module.exports = router;
