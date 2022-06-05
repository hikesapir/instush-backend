const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy) {
    try {
        const collection = await dbService.getCollection('post')
        var posts = await collection.find().toArray()
        return posts
    } catch (err) {
        // logger.error('cannot find Posts', err)
        throw err
    }
}

async function getById(postId) {
    try {
        const collection = await dbService.getCollection('post')
        const post = await collection.findOne({ _id: ObjectId(postId) })
        return post
    } catch (err) {
        // logger.error(`while finding post ${postId}`, err)
        throw err
    }
}

async function add(post) {
    try {
        const collection = await dbService.getCollection(
            'post'
        )
        const postId = await collection.insertOne(post)
        const addedPost = await collection.findOne({
            _id: ObjectId(postId.insertedId),
        })
        return addedPost
    } catch (err) {
        logger.error('cannot insert post', err)
        throw err
    }
}

async function update(post) {
    try {
        var id = ObjectId(post._id)
        delete post._id
        const collection = await dbService.getCollection('post')
        await collection.updateOne({ _id: id }, { $set: { ...post } })
        post._id = id
        return post
    } catch (err) {
        // logger.error(`cannot update post ${postId}`, err)
        throw err
    }
}

async function remove(postId) {
    try {
        const collection = await dbService.getCollection('post')
        await collection.deleteOne({ _id: ObjectId(postId) })
        return postId
    } catch (err) {
        // logger.error(`cannot remove post ${postId}`, err)
        throw err
    }
}



module.exports = {
    query,
    getById,
    add,
    update,
    remove
}