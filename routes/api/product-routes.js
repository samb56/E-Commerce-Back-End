const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  Product.findAll({
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag
      }
    ]
  })
    .then(productData => res.json(productData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})
  // find all products
  // be sure to include its associated Category and Tag data
  ;

// get one product
router.get('/:id', (req, res) => {
  Product.findOne({
    where: { id: req.params.id },
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag
      }
    ]
  })
    .then(productData => res.json(productData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

  // find a single product by its `id`
  // be sure to include its associated Category and Tag data

});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tag_ids: [1, 2, 3, 4]
      
    }
  */
  Product.create(req.body)
    .then((product) => {
      console.log(product)
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tag_ids && req.body.tag_ids.length) {

        const productTagIdArr = req.body.tag_ids.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  console.info(`${req.method} request received to delete a product`)
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      }
    })
    if (!product) {
      res.status(404).json({ message: 'no product with this id!' })
      console.log('no product with this id!')
      return
    }
    res.status(200).json(product)
    console.log('product was successfully deleted')
  } catch (err) {
    res.status(500).json(err)
  }
  // delete one product by its `id` value
});

module.exports = router;
