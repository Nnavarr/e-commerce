const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(data => res.json(data))
  .catch(err => {
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(data => {
    // if the id does not exist
    if (!data) {
      res.status(404).json({message: 'No category found with this id'});
      return;
    }
    
    // if the id exists
    res.json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(data => res.json(data))
  .catch(err => {
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(data => {
    if (!data) {
      res.status(400).json({ mesasge: 'No category found with this id'});
      return;
    }
    res.json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    if (!data) {
      res.status(400).json({ message: 'No category found with this id'});
      return;
    }
    res.json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

module.exports = router;
