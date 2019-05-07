const dummy = (blogs) => {
    return blogs.length === 0
        ? 1
        : blogs.length / blogs.length
}

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.map(blog => blog.likes).reduce((a, b) => a + b)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const favBlog = blogs[likes.indexOf(Math.max(...likes))]

    return blogs.length === 0
        ? { error: 'no blogs in list' }
        : favBlog
}

const mostBlogs = (blogs) => {
    const result = blogs.length === 0
        ? 0
        : blogs.reduce((acc, blog) => {
            if (acc.filter(item => item.author === blog.author).length === 0) {
                acc.push({ author: blog.author, blogs: 1 })
            } else {
                acc[acc.findIndex(item => item.author === blog.author)].blogs += 1
            }
            return acc
        }, [])

    return result === 0
        ? { error: 'no blogs in list' }
        : result.reduce((max, obj) => obj.blogs > max.blogs ? obj : max)
}

const mostLikes = (blogs) => {
    const result = blogs.length === 0
        ? 0
        : blogs.reduce((acc, blog) => {
            acc.filter(item => item.author === blog.author).length === 0
                ? acc.push({ author: blog.author, likes: blog.likes })
                : acc[acc.findIndex(item => item.author === blog.author)].likes += blog.likes

            return acc
        }, [])

    return result === 0
        ? { error: 'no blogs in list' }
        : result.reduce((max, obj) => obj.likes > max.likes ? obj : max)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}