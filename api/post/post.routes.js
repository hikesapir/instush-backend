const express = require('express')
const { getPosts, getById, addPost, updatePost, removePost } = require('./post.controller')

const router = express.Router()

router.get('/', getPosts)
router.get('/:id', getById)
router.post('/', addPost)
router.put('/:id', updatePost)
router.delete('/:id', removePost)


module.exports = router