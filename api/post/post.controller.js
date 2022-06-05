const postService = require('./post.service.js')

// GET LIST
async function getPosts(req, res) {
    try {
        var filterBy = req.query
        const Posts = await postService.query(filterBy)

        res.json(Posts)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get Posts' })
    }
}

// GET BY ID 
async function getById(req, res) {
    try {
        const id = req.params.id;
        const post = await postService.getById(id)
        res.json(post)
    } catch (err) {
        // logger.error('Failed to get post', err)
        res.status(500).send({ err: 'Failed to get post' })
    }
}

// POST (add post)
async function addPost(req, res) {

    try {
        const post = req.body
        const addedPost = await postService.add(post)
        res.json(addedPost)
    } catch (err) {
        // logger.error('Failed to add post', err)
        res.status(500).send({ err: 'Failed to add post' })
    }
}

// PUT (Update post)
async function updatePost(req, res) {
    try {
        const post = req.body;
        const updatedPost = await postService.update(post)
        res.json(updatedPost)
    } catch (err) {
        // logger.error('Failed to update post', err)
        res.status(500).send({ err: 'Failed to update post' })

    }
}

// DELETE (Remove post)
async function removePost(req, res) {
    try {
        const postId = req.params.id;
        const removedId = await postService.remove(postId)
        res.send(removedId)
    } catch (err) {
        // logger.error('Failed to remove post', err)
        res.status(500).send({ err: 'Failed to remove post' })
    }
}

module.exports = {
    getPosts,
    getById,
    addPost,
    updatePost,
    removePost

}