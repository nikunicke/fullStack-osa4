const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    res.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog) {
            res.json(blog.toJSON())
        } else {
            res.status(404).end()
        }
    } catch (err) {
        next(err)
    }
})


blogRouter.post('/', async (req, res, next) => {
    const body = req.body

    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if(!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        res.json(savedBlog.toJSON())
    } catch (err) {
        next(err)
    }
})

blogRouter.delete('/:id', async (req, res ,next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)

        if (!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }

        const blog = await Blog.findById(req.params.id)

        console.log(1)
        console.log(decodedToken.id)
        console.log(2)
        console.log(blog.user.toString())

        if (blog.user.toString() === decodedToken.id) {
            await Blog.findByIdAndDelete(blog.id)
            res.status(204).end()
        } else {
            console.log(decodedToken.id, blog.user.toString())
            return res.status(401).json({ error: 'unauthorized' })
        }
    } catch (err) {
        next(err)
    }
})

blogRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    const blog = {
        likes: body.likes
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        res.json(updatedBlog.toJSON())
    } catch (err) {
        next(err)
    }
})

module.exports = blogRouter