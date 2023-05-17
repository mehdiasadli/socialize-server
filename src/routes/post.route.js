const router = require('express').Router()

// Controllers
const {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
  getUserPosts
} = require('../controllers/post.controller')
// Middlewares
const { validate } = require('../middleware/validate.middleware')
// DTOs
const { paginationDTO, paramIdDTO } = require('../dto/common.dto')
const { createPostDTO, updatePostDTO } = require('../dto/post.dto')
// Routes
router.get('/', validate(paginationDTO), getPosts)
router.post('/', validate(createPostDTO), createPost)
router.get('/user/:id', validate(paramIdDTO), getUserPosts)
router.get('/:id', validate(paramIdDTO), getPost)
router.put('/:id', validate(paramIdDTO), validate(updatePostDTO), updatePost)
router.delete('/:id', validate(paramIdDTO), deletePost)

module.exports = router
