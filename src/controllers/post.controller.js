const User = require('../models/user.model')
const Post = require('../models/post.model')
const cloudinary = require('../config/cloudinary.config')
const paginate = require('../lib/utils/paginate')
const { userWithPost } = require('../lib/resources/selections')

const DEFAULT_LIMIT = 20

/**
 * @method POST
 * @route  /api/v1/post
 * @desc   Creates a new post
 * @access Private
 */
async function createPost(req, res, next) {
  const { content, image } = req.body

  try {
    let result
    if (image) {
      result = await cloudinary.uploader.upload(image, {
        folder: `socialize/post_images`
      })
    }

    const post = new Post({
      user: req.user._id,
      content: content || null,
      image: image
        ? {
            public_id: result.public_id,
            url: result.secure_url
          }
        : null
    })

    await post.save()

    const user = await User.findById(req.user._id)
    user.posts.push(post._id)
    await user.save()

    return res.status(201).json({
      success: true,
      status: 201,
      message: 'Post created successfully',
      data: post
    })
  } catch (error) {
    next(error)
  }
}
/**
 * @method PUT
 * @route  /api/v1/post/:id
 * @desc   Updates the post
 * @access Private
 */
async function updatePost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) next({ message: 'Post not found', statusCode: 404 })

    post.content = req.body.content
    const updated = await post.save()

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Post updated successfully',
      data: updated
    })
  } catch (error) {
    next(error)
  }
}
/**
 * @method DELETE
 * @route  /api/v1/post/:id
 * @desc   Deletes the post
 * @access Private
 */
async function deletePost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) next({ message: 'Post not found', statusCode: 404 })

    await Post.deleteOne({ _id: post._id })

    const user = await User.findById(req.user._id)
    user.posts = user.posts.filter((post) => post._id != req.params.id)
    await user.save()

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Post deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
/**
 * @method GET
 * @route  /api/v1/post/:id
 * @desc   Gets a post
 * @access Private
 */
async function getPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) next({ message: 'Post not found', statusCode: 404 })

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Post fetched successfully',
      data: post
    })
  } catch (error) {
    next(error)
  }
}
/**
 * @method GET
 * @route  /api/v1/post
 * @desc   Gets posts
 * @access Private
 */
async function getPosts(req, res, next) {
  try {
    const total = await Post.find().countDocuments()
    const pagination = await paginate(req.query, total, next, DEFAULT_LIMIT)
    const posts = await Post.find()
      .skip(pagination.skip)
      .limit(pagination.itemsPerPage)
      .sort({ createdAt: pagination.sort })
      .populate('user', userWithPost)

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Posts fetched successfully',
      data: posts,
      ...pagination
    })
  } catch (error) {
    next(error)
  }
}
/**
 * @method GET
 * @route  /api/v1/post/user/:id
 * @desc   Gets a user's posts
 * @access Private
 */
async function getUserPosts(req, res, next) {
  try {
    const total = await Post.find({ user: req.params.id }).countDocuments()
    const pagination = await paginate(req.query, total, next, DEFAULT_LIMIT)
    const posts = await Post.find({ user: req.params.id })
      .skip(pagination.skip)
      .limit(pagination.itemsPerPage)
      .sort({ createdAt: pagination.sort })
      .populate('user', userWithPost)

    return res.status(200).json({
      success: true,
      status: 200,
      message: "User's posts fetched successfully",
      data: posts,
      ...pagination
    })
  } catch (error) {
    next(error)
  }
}

async function likePost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) next({ message: 'Post not found', statusCode: 404 })

    let liked = false

    if (post.likes.includes(req.user._id)) {
      liked = true
    }

    if (!liked) {
      post.likes.push(req.user._id)
    } else {
      post.likes = post.likes.filter((like) => like == req.user._id)
    }

    await post.save()
    return res.status(200).json({
      success: true,
      status: 200,
      message: liked ? 'Unliked the post' : 'Liked the post'
    })
  } catch (error) {
    next(error)
  }
}
module.exports = { createPost, updatePost, deletePost, getPost, getPosts, getUserPosts, likePost }
