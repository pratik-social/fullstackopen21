const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async(request, response) => {
    const blogs=await Blog.find({}).populate('user', { username:1, name:1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async(request, response) => {
    const blog = await Blog.findById(request.params.id)
    //no{}
    response.json(blog)
})

/* const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}
*/

//  ex 4.20 applied getTokenFrom refactored to middleware
blogsRouter.post('/', async(request, response) => {
    const body = request.body
   const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)

})

blogsRouter.delete('/:id', async(request, response) => {
    const user = request.user

    const blog = await Blog.findById(request.params.id)
    // fetching this from partitcular blog itself
    const userIdOfBlog = blog.user._id
    if(userIdOfBlog.toString() === user._id.toString()){
        await Blog.findByIdAndRemove(userIdOfBlog.toString())
        response.status(204).end()
    }
    else{
        return response.status(401).json({ error : 'unauthorized' })
    }
})

blogsRouter.put('/:id', async(request,response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url,
    }

    const updatedBLog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
    response.json(updatedBLog.toJSON())
    //since we have async await it automattically pushes errors to next
    /*  try{
        const updatedBLog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
        response.json(updatedBLog.toJSON())
    } catch(exception) {
        next(exception)
    } */

    /*  Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
    .then(updatedBlog => {
    response.json(updatedBlog.toJSON())
    })*/
})
module.exports = blogsRouter