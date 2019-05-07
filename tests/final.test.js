const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
// const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', name: 'The Hulk', password: 'aaa' })
    await user.save()
})

test('creation successful with fresh username', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
        username: 'nikunicke',
        name: 'Nikolassos Martyren',
        password: '123'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
})

test('creation fails with proper status code and msg if username already taken', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
        username: 'root',
        name: 'Superman',
        password: 'Iron Man'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
})

test('creation fail with proper status code and msg if password validation not passed', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
        username: 'Valio',
        name: 'Pro Feel',
        password: '12'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password not long enough or missing')

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
})

afterAll(() => {
    mongoose.connection.close()
})