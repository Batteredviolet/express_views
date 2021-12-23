const express = require('express');
const router = express.Router()
const blogController = require('../controllers/blogController.js')

router.get('/', blogController.blog_index)

router.post('/', blogController.blog_post)

router.get('/create', blogController.blog_create)

//el ":id" , o sea los dos puntos, sirven para recoger datos como objeto

router.get('/:id', blogController.blog_detail)

router.get('/update/:id', blogController.blog_update)

router.delete('/:id', blogController.blog_delete)

module.exports = router