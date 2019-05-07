const listHelper = require('../utils/list_helper')

const bloglist = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

describe('dummy', () => {
    test('If bloglist.lenght === 0', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })

    test('If bloglist.length > 0', () => {
        const blogs = bloglist

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('totalLikes', () => {
    test('If empty list return 0', () => {
        const blogs = []
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('If blogs.length === 1, return likes of that blog', () => {
        const blogs = [bloglist[0]]
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(7)
    })

    test('If blogs.length > 1, return sum of likes', () => {
        const blogs = bloglist
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(57)
    })
})

describe('mostLiked', () => {
    test('If blogs.length === 0 return error message', () => {
        const blogs = []
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({ error: 'no blogs in list' })
    })

    test('If blogs.length === 1 return that blog', () => {
        const blogs = [bloglist[0]]
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[0])
    })

    test('If blog.length > 1 return most liked blog', () => {
        const blogs = bloglist
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[5])
    })
})

describe('mostBlogs', () => {
    test('If blogs.length === 0 return error message', () => {
        const blogs = []
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({ error: 'no blogs in list' })
    })

    test('If blogs.length === 1 return its author', () => {
        const blogs = [bloglist[0]]
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({ author: 'Michael Chan', blogs: 1 })
    })

    test('If blogs.length > 1 return author with most blogs', () => {
        const blogs = bloglist
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({ author: 'Michael Chan', blogs: 4 })
    })
})

describe('Most Likes', () => {
    test('If blog.length === 0 return error', () => {
        const blogs = []
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({ error: 'no blogs in list' })
    })

    test('If blog.length === 1 return the only author', () => {
        const blogs = [bloglist[0]]
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({ author: 'Michael Chan', likes: 7 })
    })

    test('If blog.length > 1 return author with most likes', () => {
        const blogs = bloglist
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({ author: 'Michael Chan', likes: 28 })
    })
})