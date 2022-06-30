const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [
      Product,
      {
        model: Product,
        through: ProductTag
      }
    ]
  })
    .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
    include: [Product]
  })
    .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {

  Tag.create(req.body)
    .then((tag) => {
      console.log(tag)
      res.status(200).json(tag)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json(err)
    })

  // create a new tag
});

router.put('/:id', (req, res) => {
  console.info(`${req.method} request received to update a tag`)
  console.log(req.body)

  Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
    .then((tag) => res.status(200).json(tag))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  console.info(`${req.method} request received to delete a tag`)
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    if (!tag) {
      res.status(404).json({ message: 'no tag with this id!' })
      console.log('no tag with this id!')
      return
    }
    res.status(200).json(tag)
  } catch (err) {
    res.status(500).json(err)
  }
  // delete on tag by its `id` value
});

module.exports = router;
