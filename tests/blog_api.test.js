const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

// OSA 4B TEHTÄVÄT

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('All blogs returned', async () => {
    const blogsAtStart = await helper.blogsInDB()
    expect(blogsAtStart.length).toBe(helper.initialBlogs.length)
})

test('All ids are defined', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const containsKey = blogsAtStart.map(blog => 'id' in blog)
    expect(containsKey).not.toContain(false)
})

test('A blog can be added', async () => {
    const newBlog = {
        title: 'Understanding Prototypes in JavaScript',
        author: 'Aphinya Dechalert',
        url: 'https://itnext.io/understanding-prototypes-in-javascript-e466244da086',
        likes: 72
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
        'Understanding Prototypes in JavaScript'
    )
})

test('Assign likes: 0 if likes not initially defined', async () => {
    const newBlog = {
        title: 'Understanding Prototypes in JavaScript',
        author: 'Aphinya Dechalert',
        url: 'https://itnext.io/understanding-prototypes-in-javascript-e466244da086'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    const savedBlog = blogsAtEnd[blogsAtEnd.findIndex(blog => blog.title === newBlog.title)]

    expect(savedBlog.likes).toBeDefined()
    expect(savedBlog.likes).toBe(0)

})

test('Fail with status code 400 if required fields undefined', async () => {
    const newBlog = {
        title: '',
        author: 'Aphinya Dechalert',
        url: ''
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('Remove item by id', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
})

test('Remove non-existing item', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(500)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

})

test.only('Update likes by id', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes += 1

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd[0].likes).toBe(helper.initialBlogs[0].likes + 1)
})



afterAll(() => {
    mongoose.connection.close()
})